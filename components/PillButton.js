import Link from "next/link";

const PillButton = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="PillButton">{children}</a>
    </Link>
  );
};

export default PillButton;
