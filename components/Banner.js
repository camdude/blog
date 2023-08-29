import NextImage from "next/image";
import { urlFor } from "../lib/api";

const Banner = ({ image, alt, link }) => {
  return (
    <a href={link} target="_blank">
      <NextImage
        className="Image__image--full"
        src={urlFor(image).url()}
        width={image.metadata.dimensions.width}
        height={image.metadata.dimensions.height}
        alt={alt}
        placeholder="blur"
        // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU8E6uBwAC0AFX4KNg9wAAAABJRU5ErkJggg=="
        blurDataURL={image.metadata.lqip}
        loading="lazy"
      />
    </a>
  );
};

export default Banner;
