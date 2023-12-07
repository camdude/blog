import Link from "next/link";
import { urlFor } from "../lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

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
          <a className="CardImage__title CardImage__blank">
            ____________________
          </a>
          <h4 className="CardImage__detailSection CardImage__blank">
            by author on 1 January 2000
          </h4>
          <p className="CardImage__description CardImage__blank">
            Dolor sit amet consectetur adipisicing elit. Eveniet rerum numquam,
            vero magni, vitae sequi ex, inventore debitis consequatur labore
            officia officiis a doloribus veritatis non! Doloribus commodi
            veritatis fugiat?
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="CardImage--list">
        <div className="CardImage__imgContainer">
          {/* {console.log(coverImage)} */}
          {coverImage ? (
            <Image
              className="CardImage__image"
              src={urlFor(coverImage).fit("max").url()}
              width={coverImage.metadata.dimensions.width}
              height={coverImage.metadata.dimensions.height}
              alt={""}
              placeholder="blur"
              blurDataURL={coverImage.metadata.lqip}
              loading="lazy"
            />
          ) : (
            <div className="CardImage__blankImage" />
          )}
        </div>
        <div className="CardImage__content">
          <Link className="CardImage__title" {...link}>
            {title}
          </Link>
          <div className="CardImage__detailSection">
            <h4 className="CardImage__detail">
              <FontAwesomeIcon icon="user" /> {author}
            </h4>
            <h4 className="CardImage__detail">
              <FontAwesomeIcon icon="calendar-alt" /> {date}
            </h4>
          </div>
          <p className="CardImage__description">
            {children.length > 200 ? children.substr(0, 200) + "..." : children}
          </p>
        </div>
      </div>
    );
  }
};

export default CardImage;
