import Link from "next/link";

const PillButton = ({ children, href, onClick }) => {
  if (href) {
    return (
      <Link className="PillButton" href={href}>
        {children}
      </Link>
    );
  } else {
    return (
      <a className="PillButton" onClick={onClick}>
        {children}
      </a>
    );
  }
};

export default PillButton;
