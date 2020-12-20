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
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import { faFacebookSquare, faGithub } from "@fortawesome/free-brands-svg-icons"

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
  faGithub
);

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
