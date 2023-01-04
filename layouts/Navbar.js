import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [navOpen, setnavOpen] = useState(false);

  return (
    <div className="Navbar">
      <div className="Navbar__header">
        <div className="Navbar__menu">
          <FontAwesomeIcon
            className="Navbar__icon"
            size="lg"
            icon="bars"
            onClick={() => {
              setnavOpen(!navOpen);
            }}
          />
        </div>
        <div className="Navbar__title">Cameron Clifford</div>
      </div>
      <ul className={`Navbar__list ${navOpen ? "Navbar__list--open" : ""}`}>
        <li className="Navbar__item">
          <Link className="Navbar__link" href="/">
            Home
          </Link>
        </li>
        <li className="Navbar__item">
          <Link className="Navbar__link" href="/#about">
            About
          </Link>
        </li>
        <li className="Navbar__item">
          <Link className="Navbar__link" href="/partner">
            Partner
          </Link>
        </li>
        <li className="Navbar__item">
          <Link className="Navbar__link" href="/blog">
            Blog
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
