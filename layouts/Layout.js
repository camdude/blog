import { useEffect } from "react";
import { initGA, logPageView } from "../utils/analytics";
import Head from "next/head";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

export default function Layout({ meta, children }) {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <div>
      <Head>
        <title>{`Cameron Clifford | ${meta.title}`}</title>
        <link rel="icon" type="image/png" href="/favicon-64x64.png" sizes="64x64" />
        <link rel="icon" type="image/png" href="/favicon-512x512.png" sizes="512x512" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:image" content={meta.image|| "/portrait-square.png"} />
        <meta property="og:url" content={`https://cameronclifford.com${meta.url}`} />
        <meta property="og:site_name" content="Cameron Clifford" />
        <meta name="description" content={meta.desc} />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
