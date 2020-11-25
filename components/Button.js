import Link from "next/link";

const Button = ({ children, href, onClick, disabled = false }) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={`Button ${!disabled || "Button--disabled"}`}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <a
        className={`Button ${!disabled || "Button--disabled"}`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
};

export default Button;
