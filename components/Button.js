import Link from "next/link";

const Button = ({ children, id, page, href, target, onClick, disabled = false,  }) => {
  if (page) {
    return (
      <Link href={page} id={id} className={`Button ${!disabled || "Button--disabled"}`}>
          {children}
      </Link>
    );
  } else {
    return (
      <a
        id={id}
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
