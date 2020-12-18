const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__section">
        <h4 className="Footer__heading">Contact</h4>
        <ul className="Footer__list">
          <li className="Footer__listItem">
            Email:
            <a
              className="link Footer__link"
              href="mailto:contact@cameronclifford.com"
              target="_blank"
            >
              contact@cameronclifford.com
            </a>
          </li>
          <li className="Footer__listItem">
            Facebook:
            <a
              className="link Footer__link"
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
            <a className="link " href="/">
              Home
            </a>
          </li>
          <li className="Footer__listItem">
            <a className="link" href="/blog">
              Blog
            </a>
          </li>
          <li className="Footer__listItem">
            <a className="link" href="/subscribe">
              MTS Updates
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
