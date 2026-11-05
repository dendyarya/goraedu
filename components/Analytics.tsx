import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Google Tag Manager, which carries our Google Analytics 4 tag (page views only). Nothing about practice answers or
 * tool inputs is ever pushed to it, and visitors whose browser sends Global Privacy Control are not tracked.
 */
export default function Analytics() {
  const id = SITE.gtmId;
  if (!SITE.indexable || !/^GTM-[A-Z0-9]+$/.test(id)) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,l,i){
  if (navigator.globalPrivacyControl) return;
  w[l]=w[l]||[];
  w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var s=d.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtm.js?id='+i;
  d.head.appendChild(s);
})(window,document,'dataLayer','${id}');`}
    </Script>
  );
}
