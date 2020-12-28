import { useEffect } from "react";
import { initGA, logPageView } from "../utils/analytics";
import Head from "next/head";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

export default function Layout({ title, desc, className, children }) {
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
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={desc} />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
