import { urlFor } from "../lib/api";
import { createFragmentId } from "../utils/urlFunctions";
import Image from "./Image";
import ReactionElement from "./ReactionElement";

const ImageTextBlock = ({ heading, image, children }) => {
  return (
    <div className="ImageTextBlock">
      <div className="ImageTextBlock__imgContainer">
        <img className="Image__image" src={urlFor(image).fit("max").url()} />
      </div>
      <div className="ImageTextBlock__textBlock">
      <ReactionElement subject={`Response to "${heading}"`} body="">
          <h2
            className="heading-secondary ImageTextBlock__heading"
            id={createFragmentId(heading)}
          >
            {heading}
          </h2>
        </ReactionElement>

        <p>{children}</p>
      </div>
    </div>
  );
};

export default ImageTextBlock;
