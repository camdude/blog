import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ReactionElement = ({ children, subject="", body="" }) => {
  return (
    <div className="ReactionElement">
      <div className="ReactionElement__content">{children}</div>
      <div className="ReactionElement__options">
        {/* <Link
          className="ReactionElement__link--heart"
          href={""}
        >
          <FontAwesomeIcon className="ReactionElement__icon" icon="heart" />
        </Link> */}
        <Link
          className="ReactionElement__link"
          href={`mailto:afes@cameronclifford.com?subject=${subject}&body=${body}`}
        >
          <FontAwesomeIcon className="ReactionElement__icon" icon="reply" />
        </Link>
      </div>
    </div>
  );
};

export default ReactionElement;
