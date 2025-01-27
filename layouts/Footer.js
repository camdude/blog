import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__columns">
        <div className="Footer__section">
          <h4 className="Footer__heading">Links</h4>
          <ul className="Footer__list">
            <li className="Footer__listItem">
              <a
                className="Footer__link link"
                href="mailto:dev@cameronclifford.com"
                target="blank"
              >
                <FontAwesomeIcon icon="envelope" /> Email
              </a>
            </li>
            <li className="Footer__listItem">
              <a
                className="Footer__link link"
                href="https://fb.me/cameron.clifford.1654"
                target="blank"
              >
                <FontAwesomeIcon icon={["fab", "facebook-square"]} /> Facebook
              </a>
            </li>
            <li className="Footer__listItem">
              <a
                className="Footer__link link"
                href="https://github.com/camdude"
                target="blank"
              >
                <FontAwesomeIcon icon={["fab", "github"]} /> Github
              </a>
            </li>
          </ul>
        </div>
        <div className="Footer__section">
          <h4 className="Footer__heading">Navigation</h4>
          <ul className="Footer__list">
            <li className="Footer__listItem">
              <a className="Footer__link link" href="/">
                Home
              </a>
            </li>
            <li className="Footer__listItem">
              <a className="Footer__link link" href="/blog">
                Blog
              </a>
            </li>
            <li className="Footer__listItem">
              <a className="Footer__link link" href="/partner">
                Partner
              </a>
            </li><li className="Footer__listItem">
              <a className="Footer__link link" href="/bookings">
                Book a Meeting
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="Footer__copyright">
        Copyright © 2020-{moment().format("YYYY")} Cameron Clifford, All rights
        reserved.
      </div>
    </div>
  );
};

export default Footer;
