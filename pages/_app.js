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
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faGithub } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/index.scss";

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
  faDownload
);
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { gtmVirtualPageView } from '../lib/gtm';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };

    gtmVirtualPageView(mainDataLayer);
  }, [pageProps]);

  return <Component {...pageProps} />;
}

export default MyApp;
