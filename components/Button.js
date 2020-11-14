import Link from "next/link";

const Button = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="Button">{children}</a>
    </Link>
  );
};

export default Button;
