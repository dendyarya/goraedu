import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Google AdSense loader. Visitors whose browser sends Global Privacy Control get non-personalized ads only
 * (our privacy policy promises we do not share data for targeted advertising with them). Practice answers and tool
 * inputs are never sent to Google. Ad placement is controlled in AdSense; we never place ads inside a question,
 * its answers or a tool's results.
 */
export default function AdSense() {
  const id = SITE.adsenseClient;
  if (!SITE.indexable || !/^ca-pub-\d{16}$/.test(id)) return null;
  return (
    <Script id="adsense" strategy="afterInteractive">
      {`(function(w,d,c){
  w.adsbygoogle=w.adsbygoogle||[];
  if (navigator.globalPrivacyControl) w.adsbygoogle.requestNonPersonalizedAds=1;
  var s=d.createElement('script');
  s.async=true;
  s.crossOrigin='anonymous';
  s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+c;
  d.head.appendChild(s);
})(window,document,'${id}');`}
    </Script>
  );
}
