import Link from "next/link";

const PillButton = ({ children, href, onClick }) => {
  if (href) {
    return (
      <Link href={href}>
        <a className="PillButton">{children}</a>
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
