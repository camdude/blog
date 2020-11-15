import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faTimes,
  faCircle,
  faList,
  faTh,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faTimes, faCircle, faList, faTh, faCalendarDay);

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
