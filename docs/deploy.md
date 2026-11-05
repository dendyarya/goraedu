# Deploy

goraedu.com runs on the same VPS as careerchangefinder.com and cybercareerfinder.com, fully separate from them
(own Linux user `gora`, folders, Nginx file and logs). It is a static site: Nginx serves the build directly,
so the server needs no Node.js, PM2 or open app port.

| Trigger                | What happens                                |
| ---------------------- | ------------------------------------------- |
| Pull request to `main` | All checks, no deploy                       |
| Push to `main`         | Checks, then live on https://goraedu.com    |
| Actions → Deploy → Run | Same as a push (use it to redeploy by hand) |

Checks in every run: `npm audit`, type check, lint, formatting → `next build` → the build has its pages and the
right `noindex` setting → release with `MANIFEST.sha256` → rsync to the VPS → `activate` (checksums, read-only,
switch, health check through Nginx, automatic rollback).

Until the VPS secrets exist, the deploy job prints a warning and uploads nothing.

## On the VPS

| Path                                               | What                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| `/var/www/goraedu/production/releases/<sha>-<run>` | releases (read-only once active; newest 5 kept)                      |
| `/var/www/goraedu/production/current`              | symlink to the live release; the Nginx `root`                        |
| `/var/www/goraedu/production/deploys.log`          | one line per activated release                                       |
| `/home/gora/bin/gora-gate`                         | forced command for the deploy key: only rsync (rrsync) or `activate` |
| `/home/gora/bin/gora-activate`                     | checksum check, switch, health check, rollback                       |
| `/etc/nginx/sites-available/goraedu.com`           | the only Nginx site file we add (security headers included)          |
| `/etc/nginx/snippets/gora-cloudflare-realip.conf`  | Cloudflare ranges, so logs show the visitor IP                       |
| `/etc/ssl/goraedu/origin.{pem,key}`                | Cloudflare Origin Certificate                                        |
| `/etc/logrotate.d/gora-nginx`                      | our Nginx logs kept 14 days                                          |

## Setup steps (once)

Secrets never go into chat or screenshots: private keys, the origin key, passwords, API keys.

1. **Cloudflare DNS and SSL** (domain goraedu.com, nameservers already moved to Cloudflare).
   - DNS: delete the imported A and AAAA records, then add `A @ → <VPS IP>` and `A www → <VPS IP>`, both Proxied.
   - SSL/TLS → Overview: **Full (strict)**. Edge Certificates: Always Use HTTPS on, minimum TLS 1.2.
2. **Origin certificate.** SSL/TLS → Origin Server → Create Certificate: RSA, hostnames `goraedu.com` and
   `*.goraedu.com`, 15 years. On the VPS as root: `mkdir -p /etc/ssl/goraedu`, paste the certificate into
   `/etc/ssl/goraedu/origin.pem` and the private key into `/etc/ssl/goraedu/origin.key` with `nano`.
3. **VPS setup.** On a computer with the repo: `bash deploy/make-bundle.sh` makes `gora-server-setup.tar.gz`.
   Upload it, then as root:
   `mkdir ~/gora-setup && tar -xzf gora-server-setup.tar.gz -C ~/gora-setup && cd ~/gora-setup && bash setup-vps.sh`.
   It prints the values for step 4.
4. **GitHub secrets** (Settings → Secrets and variables → Actions → New repository secret): `VPS_HOST`,
   `VPS_PORT`, `VPS_USER` (`gora`), `VPS_KNOWN_HOSTS` (printed by the script) and `VPS_SSH_KEY` = the full content
   of `/root/gora-deploy-key/id_ed25519` (`cat` it on the server and copy it straight into GitHub, never into chat).
   Then on the server: `rm -r /root/gora-deploy-key`.
5. **First deploy.** Actions → Deploy → Run workflow on `main` (or push any commit). Open https://goraedu.com.

## Launch (later)

When the trust pages and P1 pages are published (runbook), add the repository **variables**
`SITE_ENV=production` and `SITE_URL=https://goraedu.com`, then redeploy. Until then every build is `noindex`
and `robots.txt` blocks crawling.

## Rollback

`gora-activate` rolls back automatically when the health check fails. By hand: re-run the Deploy workflow on an
older commit, or on the VPS as `gora` point `current` at an older folder in `releases/`.
