import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Google Analytics 4, page views only. Google signals and ad personalization are off, nothing about practice
 * answers or tool inputs is sent, and visitors whose browser sends Global Privacy Control are not tracked.
 */
export default function Analytics() {
  const id = SITE.gaId;
  if (!SITE.indexable || !/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <Script id="ga4" strategy="afterInteractive">
      {`(function(){
  if (navigator.globalPrivacyControl) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${id}';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', '${id}', { allow_google_signals: false, allow_ad_personalization_signals: false });
})();`}
    </Script>
  );
}
