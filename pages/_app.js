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
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBars,
  faTimes,
  faCircle,
  faList,
  faTh,
  faCalendarDay,
  faSortNumericDown,
  faSortNumericUp,
  faSpinner
);

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
