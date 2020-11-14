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
        <h1 className="Navbar__title">Cameron Clifford</h1>
      </div>
      <ul className={`Navbar__list ${navOpen ? "Navbar__list--open" : ""}`}>
        <li className="Navbar__item">
          <Link href="/">
            <a className="Navbar__link">Home</a>
          </Link>
        </li>
        <li className="Navbar__item">
          <Link href="/#about">
            <a className="Navbar__link">About</a>
          </Link>
        </li>
        <li className="Navbar__item">
          <Link href="/#support">
            <a className="Navbar__link">Support</a>
          </Link>
        </li>
        <li className="Navbar__item">
          <Link href="/blog">
            <a className="Navbar__link">Blog</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
