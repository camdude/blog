import { useEffect } from "react";
import { initGA, logPageView } from "../utils/analytics";
import Head from "next/head";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Script from "next/script";

export default function Layout({ meta, children }) {
  // GA3 - will be depricated in July 2023
  // useEffect(() => {
  //   if (!window.GA_INITIALIZED) {
  //     initGA();
  //     window.GA_INITIALIZED = true;
  //   }
  //   logPageView();
  // }, []);

  return (
    <div>
      <Head>
        <title>{`${meta.title} | Cameron Clifford`}</title>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-64x64.png"
          sizes="64x64"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-512x512.png"
          sizes="512x512"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nobile:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content={meta.title} />
        <meta property="og:type" content={meta.type} />
        <meta
          property="og:image"
          content={meta.image || "/portrait-square.png"}
        />
        <meta
          property="og:url"
          content={`https://cameronclifford.com${meta.url}`}
        />
        <meta property="og:site_name" content="Cameron Clifford" />
        <meta name="description" content={meta.desc} />
      </Head>
      {/* Google Tag Manager  */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KKB5V23');
      `,
        }}
      />
      {/* End Google Tag Manager */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KKB5V23"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>`,
        }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
