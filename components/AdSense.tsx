import { SITE } from "@/lib/site";

/**
 * Google AdSense, as static tags in <head> so AdSense's crawler finds the standard snippet in the page HTML.
 * The small inline script runs first: visitors whose browser sends Global Privacy Control get non-personalized ads
 * only (as our privacy policy promises). Practice answers and tool inputs are never sent to Google. Ad placement is
 * controlled in AdSense; we never place ads inside a question, its answers or a tool's results.
 */
export default function AdSense() {
  const id = SITE.adsenseClient;
  if (!SITE.indexable || !/^ca-pub-\d{16}$/.test(id)) return null;
  return (
    <>
      <script
        // eslint-disable-next-line react/no-danger -- fixed string, no user data: GPC choice before adsbygoogle.js runs
        dangerouslySetInnerHTML={{
          __html:
            "window.adsbygoogle=window.adsbygoogle||[];if(navigator.globalPrivacyControl)window.adsbygoogle.requestNonPersonalizedAds=1;",
        }}
      />
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
