import Link from "next/link";

const Button = ({ children, page, href, target, onClick, disabled = false,  }) => {
  if (page) {
    return (
      <Link href={page}>
        <a className={`Button ${!disabled || "Button--disabled"}`}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <a
        className={`Button ${!disabled || "Button--disabled"}`}
        href={href}
        target={target}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
};

export default Button;
