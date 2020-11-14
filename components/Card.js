import Link from "next/link";

const Card = ({ title, author, date, children, link }) => {
  return (
    <div className="Card">
      <Link {...link}>
        <a className="Card__title">{title}</a>
      </Link>
      <h4 className="Card__details">
        {`by ${author} on ${new Intl.DateTimeFormat("en-AU", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(new Date(date))}`}
      </h4>
      <p className="Card__description">{children}</p>
    </div>
  );
};

export default Card;
