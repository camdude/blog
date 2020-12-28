import { useEffect } from "react";
import { initGA, logPageView } from "../utils/analytics";

export default function Layout({children}) {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return <div>{children}</div>;
}
