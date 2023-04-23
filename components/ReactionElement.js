import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

const ReactionElement = ({ children, subject = "", body = "", link }) => {
  const [showAlert, setShowAlert] = useState(false);

  function copyToClipboard(e, copyText) {
    e.preventDefault();
    navigator.clipboard.writeText(copyText); // copy to clipboard

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }

  return (
    <div className="ReactionElement">
      <div className="ReactionElement__content">{children}</div>

      <div className="ReactionElement__options">
        {/* <Link className="ReactionElement__link--heart" href={""}>
          <FontAwesomeIcon className="ReactionElement__icon" icon="heart" />
        </Link> */}
        <div
          className="ReactionElement__link"
          href={``}
          onClick={(e) => copyToClipboard(e, link)}
        >
          {showAlert ? (
            <div className="ReactionElement__alert ReactionElement__alert--show">
              Copied link!
            </div>
          ) : (
            ""
          )}
          <FontAwesomeIcon className="ReactionElement__icon" icon="link" />
        </div>
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
