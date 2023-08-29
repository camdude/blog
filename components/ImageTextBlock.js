import { urlFor } from "../lib/api";
import { createFragmentId } from "../utils/urlFunctions";
import Image from "next/image";
import ReactionElement from "./ReactionElement";

const ImageTextBlock = ({ heading, slug, image, children }) => {
  return (
    <div className="ImageTextBlock">
      <div className="ImageTextBlock__imgContainer">
        {/* <Image
          className="Image__image--full"
          src={urlFor(image).fit("max").url()}
          width={image.metadata.dimensions.width}
          height={image.metadata.dimensions.height}
          // alt={alt}
          placeholder="blur"
          blurDataURL={image.metadata.lqip}
          loading="lazy"
        /> */}
        <img className="Image__image" src={urlFor(image).fit("max").url()} />
      </div>
      <div className="ImageTextBlock__textBlock">
        <ReactionElement
          subject={`Response to "${heading}"`}
          body={`https://cameronclifford.com/blog/${slug}#${createFragmentId(
            heading
          )}`}
          link={`https://cameronclifford.com/blog/${slug}#${createFragmentId(
            heading
          )}`}
        >
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
