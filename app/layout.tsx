import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE } from "@/lib/site";
import "./globals.css";

// Self-hosted variable fonts (SIL Open Font License): no request to Google at build or run time.
// Archivo for headings (set slightly narrow, like stamped equipment labels); Public Sans, the U.S. Web Design
// System typeface, for body text, a nod to the official sources every answer cites.
const archivo = localFont({
  src: "./fonts/archivo-variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});
const publicSans = localFont({
  src: [
    { path: "./fonts/public-sans-variable.woff2", style: "normal" },
    { path: "./fonts/public-sans-variable-italic.woff2", style: "italic" },
  ],
  variable: "--font-public-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: Free Skilled Trades Certification Practice with Official Sources`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
  // Only the production build may be indexed.
  robots: SITE.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1a26" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${archivo.variable} ${publicSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
