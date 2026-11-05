#!/bin/bash
# One-time VPS setup for goraedu.com (docs/deploy.md). Run as root from the unpacked bundle:
#   bash setup-vps.sh
# Built for the same VPS as careerchangefinder.com and cybercareerfinder.com, and fully separate from them:
#   user "gora", /var/www/goraedu, /etc/ssl/goraedu (checks only),
#   /etc/nginx/sites-{available,enabled}/goraedu.com, /etc/nginx/snippets/gora-cloudflare-realip.conf,
#   /etc/logrotate.d/gora-nginx.
# No Node.js or PM2 on the server: goraedu is a static site served by Nginx.
# Other sites' Nginx files are never edited. If "nginx -t" fails, our site link is removed again.
# Safe to run again.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
APP=gora
ROOT=/var/www/goraedu
SSL=/etc/ssl/goraedu
SITE=goraedu.com

say() { printf '\n\033[1m== %s\033[0m\n' "$*"; }
die() { printf '\n\033[31mSTOP: %s\033[0m\n' "$*" >&2; exit 1; }
[ "$(id -u)" = 0 ] || die "run as root (or with sudo)"
command -v apt-get >/dev/null || die "this script expects Ubuntu or Debian"

# ---------------------------------------------------------------- 1. packages
say "1/7 Packages (rsync, curl)"
command -v nginx >/dev/null || die "Nginx is not installed (the other sites should already use it)"
missing=()
for p in rsync curl; do command -v "$p" >/dev/null || missing+=("$p"); done
if [ ${#missing[@]} -gt 0 ]; then apt-get update -qq && apt-get install -y -qq "${missing[@]}"; fi
if ! command -v rrsync >/dev/null; then
  src=$(ls /usr/share/doc/rsync/scripts/rrsync* 2>/dev/null | head -1 || true)
  [ -n "$src" ] || die "rrsync not found (comes with rsync). Install a newer rsync or copy rrsync to /usr/bin."
  case "$src" in *.gz) gunzip -c "$src" > /usr/bin/rrsync ;; *) cp "$src" /usr/bin/rrsync ;; esac
  chmod 755 /usr/bin/rrsync
fi
echo "ok"

# ---------------------------------------------------------------- 2. app user and folders
say "2/7 User '$APP' and folders"
id "$APP" >/dev/null 2>&1 || useradd --create-home --shell /bin/bash "$APP"
passwd -l "$APP" >/dev/null   # no password login for this user, ever
# public static site: Nginx (www-data) must read it, so folders are world-readable but only gora can write
install -d -o "$APP" -g "$APP" -m 755 "$ROOT" "$ROOT/production" "$ROOT/production/releases"
echo "ok"

# ---------------------------------------------------------------- 3. deploy scripts
say "3/7 Deploy scripts"
install -d -o "$APP" -g "$APP" -m 755 "/home/$APP/bin"
for f in gora-gate gora-activate; do
  install -o root -g root -m 755 "$HERE/server/$f" "/home/$APP/bin/$f"
done
echo "ok (scripts are owned by root, so the deploy key cannot change them)"

# ---------------------------------------------------------------- 4. deploy key (GitHub Actions)
say "4/7 Deploy key for GitHub Actions"
KEYDIR=/root/gora-deploy-key
AUTH="/home/$APP/.ssh/authorized_keys"
install -d -o "$APP" -g "$APP" -m 700 "/home/$APP/.ssh"
if ! grep -q "gora-github-deploy" "$AUTH" 2>/dev/null; then
  install -d -m 700 "$KEYDIR"
  [ -f "$KEYDIR/id_ed25519" ] || ssh-keygen -q -t ed25519 -N "" -C "gora-github-deploy" -f "$KEYDIR/id_ed25519"
  echo "command=\"/home/$APP/bin/gora-gate\",restrict $(cat "$KEYDIR/id_ed25519.pub")" >> "$AUTH"
  chown "$APP:$APP" "$AUTH" && chmod 600 "$AUTH"
  echo "New deploy key created. Its PRIVATE half is in $KEYDIR/id_ed25519 (docs/deploy.md, step 4)."
else
  echo "deploy key already installed"
fi

# ---------------------------------------------------------------- 5. Cloudflare Origin Certificate
say "5/7 Cloudflare Origin Certificate"
install -d -m 755 "$SSL"
if [ -s "$SSL/origin.pem" ] && [ -s "$SSL/origin.key" ]; then
  chmod 644 "$SSL/origin.pem"; chmod 600 "$SSL/origin.key"
  openssl x509 -in "$SSL/origin.pem" -noout -subject -enddate || die "origin.pem is not a valid certificate"
  CERT_OK=1
else
  echo "Not found yet: $SSL/origin.pem and $SSL/origin.key (docs/deploy.md, step 2)."
  echo "Run this script again after adding them; the Nginx site is only enabled with a certificate."
  CERT_OK=0
fi

# ---------------------------------------------------------------- 6. Nginx site
say "6/7 Nginx site (only our file)"
tmp=$(mktemp)
{
  echo "# written by goraedu setup-vps.sh $(date -u +%F) from cloudflare.com/ips-v4 and ips-v6"
  for v in 4 6; do curl -fsS "https://www.cloudflare.com/ips-v$v" | sed -E 's/^(.+)$/set_real_ip_from \1;/'; echo; done
  echo "real_ip_header CF-Connecting-IP;"
} | grep -v '^$' > "$tmp"
grep -q set_real_ip_from "$tmp" || die "could not download the Cloudflare IP list"
install -m 644 "$tmp" /etc/nginx/snippets/gora-cloudflare-realip.conf && rm -f "$tmp"

if [ "$CERT_OK" != 1 ]; then
  echo "site skipped until the certificate is in place"
else
  conf="$HERE/nginx/$SITE.conf"
  if [ ! -s /proc/net/if_inet6 ]; then
    sed -E '/listen \[::\]/d' "$conf" > "/tmp/gora-$SITE.conf" && conf="/tmp/gora-$SITE.conf"
  fi
  ver=$(nginx -v 2>&1 | sed -E 's/.*nginx\/([0-9.]+).*/\1/')
  if [ "$(printf '%s\n1.25.1\n' "$ver" | sort -V | head -1)" != "1.25.1" ]; then
    # Nginx older than 1.25.1: "http2 on;" does not exist yet
    sed -E -e '/^\s*http2 on;/d' -e 's/listen (\[::\]:)?443 ssl;/listen \1443 ssl http2;/' "$conf" > "/etc/nginx/sites-available/$SITE"
  else
    install -m 644 "$conf" "/etc/nginx/sites-available/$SITE"
  fi
  ln -sfn "/etc/nginx/sites-available/$SITE" "/etc/nginx/sites-enabled/$SITE"
  if nginx -t; then
    systemctl reload nginx && echo "Nginx reloaded"
  else
    rm -f "/etc/nginx/sites-enabled/$SITE"
    nginx -t && systemctl reload nginx
    die "Nginx test failed with our site; it was disabled again, other sites unchanged"
  fi
fi

# ---------------------------------------------------------------- 7. log retention
say "7/7 Nginx logs for this site kept 14 days (Privacy Policy)"
cat > /etc/logrotate.d/gora-nginx <<'ROT'
/var/log/nginx/gora-*.log {
    daily
    rotate 14
    missingok
    notifempty
    compress
    delaycompress
    sharedscripts
    postrotate
        [ -s /run/nginx.pid ] && kill -USR1 "$(cat /run/nginx.pid)"
    endscript
}
ROT
echo "ok"

say "Done"
port=$(sshd -T 2>/dev/null | awk '/^port /{print $2; exit}')
echo "GitHub repository secrets (docs/deploy.md, step 4):"
echo "  VPS_PORT        = ${port:-22}"
echo "  VPS_USER        = $APP"
echo "  VPS_HOST        = this server's public IP"
echo "  VPS_KNOWN_HOSTS = the line below, with <IP> replaced by that IP:"
key=$(cut -d' ' -f1,2 /etc/ssh/ssh_host_ed25519_key.pub)
if [ "${port:-22}" = 22 ]; then echo "    <IP> $key"; else echo "    [<IP>]:$port $key"; fi
echo "  VPS_SSH_KEY     = contents of /root/gora-deploy-key/id_ed25519 (copy it into GitHub, never into chat), then delete that folder"
