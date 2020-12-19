const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__columns">
        <div className="Footer__section">
          <h4 className="Footer__heading">Contact</h4>
          <ul className="Footer__list">
            <li className="Footer__listItem">
              Email:
              <a
                className="Footer__link link u-float-right"
                href="mailto:cameronclifford@thebranch.org.au"
                target="_blank"
              >
                cameronclifford@thebranch.org.au
              </a>
            </li>
            <li className="Footer__listItem">
              Facebook:
              <a
                className="Footer__link link u-float-right"
                href="https://fb.me/cameron.clifford.1654"
                target="_blank"
              >
                fb.me/cameron.clifford.1654
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
              <a className="Footer__link link" href="/subscribe">
                MTS Updates
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="Footer__copyright">Copyright Cameron Clifford © 2020</div>
    </div>
  );
};

export default Footer;
