import { urlFor } from "../lib/api";
import Image from "./Image";

const ImageTextBlock = ({ heading, image, children }) => {
  return (
    <div className="ImageTextBlock">
      <div className="ImageTextBlock__imgContainer">
        <img className="Image__image" src={urlFor(image).fit("max").url()} />
      </div>
      <div className="ImageTextBlock__textBlock">
        <h2 className="heading-secondary ImageTextBlock__heading" id={heading}>
          {heading}
        </h2>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default ImageTextBlock;
