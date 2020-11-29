import Link from "next/link";
import moment from "moment";

const Card = ({ title, author, date, children, link, placeholder = false }) => {
  if (placeholder) {
    return (
      <div className="Card">
        <a className="Card__title Card__blank">____________________</a>
        <h4 className="Card__details Card__blank">
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
        <Link {...link}>
          <a className="Card__title">{title}</a>
        </Link>
        <h4 className="Card__details">
          {`by ${author} on ${moment(date).format("MMMM Do, YYYY")}`}
        </h4>
        <p className="Card__description">{children}</p>
      </div>
    );
  }
};

export default Card;
