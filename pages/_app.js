import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faTimes,
  faCircle,
  faList,
  faTh,
  faCalendarDay,
  faSortNumericDown,
  faSortNumericUp,
  faSpinner,
  faUser,
  faCalendarAlt,
  faTag,
  faEnvelope,
  faRssSquare,
  faFile,
  faDownload,
  faComments,
  faReply,
  faHeart,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faGithub } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/index.scss";
import { Nobile } from "next/font/google";

library.add(
  faBars,
  faTimes,
  faCircle,
  faList,
  faTh,
  faCalendarDay,
  faSortNumericDown,
  faSortNumericUp,
  faSpinner,
  faUser,
  faCalendarAlt,
  faTag,
  faEnvelope,
  faFacebookSquare,
  faGithub,
  faRssSquare,
  faFile,
  faDownload,
  faComments,
  faReply,
  faHeart,
  faLink
);
import { useEffect } from "react";
import { useRouter } from "next/router";
import { gtmVirtualPageView } from "../lib/gtm";

const nobile = Nobile({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };

    gtmVirtualPageView(mainDataLayer);
  }, [pageProps]);

  return (
    <main className={nobile.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
