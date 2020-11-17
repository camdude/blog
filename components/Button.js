import Link from "next/link";

const Button = ({ children, href, disabled=false }) => {
  return (
    <Link href={href}>
      <a className={`Button ${!disabled || "Button--disabled"}`}>{children}</a>
    </Link>
  );
};

export default Button;
