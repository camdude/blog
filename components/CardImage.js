import Link from "next/link";
import { urlFor } from "../lib/api";

const CardImage = ({ title, coverImage, author, date, children, link }) => {
  return (
    <div className="CardImage">
      <div className="CardImage__imgContainer">
        <img
          className="CardImage__image"
          src={urlFor(coverImage).url()}
          alt=""
        />
      </div>
      <div className="CardImage__content">
        <Link {...link}>
          <a className="CardImage__title">{title}</a>
        </Link>
        <h4 className="CardImage__details">
          {`by ${author} on ${new Intl.DateTimeFormat("en-AU", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(date))}`}
        </h4>
        <p className="CardImage__description">{children}</p>
      </div>
    </div>
  );
};

export default CardImage;
