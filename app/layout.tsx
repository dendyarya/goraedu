import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE } from "@/lib/site";
import "./globals.css";

// Self-hosted variable fonts (SIL Open Font License 1.1): no request to Google at build or run time.
// Space Grotesk for headings, Manrope for body text.
const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-variable.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});
const manrope = localFont({
  src: "./fonts/manrope-variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
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
    { media: "(prefers-color-scheme: light)", color: "#f3f8fe" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1522" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
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
