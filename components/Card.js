import Link from "next/link";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ title, author, date, children, link, placeholder = false }) => {
  if (placeholder) {
    return (
      <div className="Card">
        <a className="Card__title Card__blank">____________________</a>
        <h4 className="Card__detailSection Card__blank">
          by author on 1 January 2000
        </h4>
        <p className="Card__description Card__blank">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
          rerum numquam, vero magni, vitae sequi ex, inventore debitis
          consequatur labore officia officiis a doloribus veritatis non!
          Doloribus commodi veritatis fugiat?
        </p>
      </div>
    );
  } else {
    return (
      <div className="Card">
        <Link className="Card__title" {...link}>
          {title}
        </Link>
        <div className="Card__detailSection">
          <h4 className="CardImage__detail">
            <FontAwesomeIcon icon="user" />
            {` ${author} `}
          </h4>
          <h4 className="Card__detail">
            <FontAwesomeIcon icon="calendar-alt" />
            {` ${moment(date).format("MMMM Do, YYYY")}`}
          </h4>
        </div>
        <p className="Card__description">
          {children.length > 200 ? children.substr(0, 200) + "..." : children}
        </p>
      </div>
    );
  }
};

export default Card;
