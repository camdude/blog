import Link from "next/link";
import { urlFor } from "../lib/api";

const CardImage = ({
  title,
  coverImage,
  author,
  date,
  children,
  link,
  placeholder = false,
}) => {
  if (placeholder) {
    return (
      <div className="CardImage">
        <div className="CardImage__imgContainer">
          <div className="CardImage__blankImage" />
        </div>
        <div className="CardImage__content">
          <a className="CardImage__title CardImage__blank">____________________</a>
          <h4 className="CardImage__details CardImage__blank">by author on 1 January 2000</h4>
          <p className="CardImage__description CardImage__blank">
            Dolor sit amet consectetur adipisicing elit. Eveniet
            rerum numquam, vero magni, vitae sequi ex, inventore debitis
            consequatur labore officia officiis a doloribus veritatis non!
            Doloribus commodi veritatis fugiat?
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="CardImage">
        <div className="CardImage__imgContainer">
          <img
            className="CardImage__image"
            src={urlFor(coverImage).width(400).fit("max").url()}
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
  }
};

export default CardImage;
