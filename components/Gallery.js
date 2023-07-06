import { urlFor } from "../lib/api";
import Image from "./Image";

const Gallery = ({ images }) => {
  return (
    <div className="Gallery">
      {console.log(images)}
      {images.map((i) => (
        <div key={i._key} className="Gallery__imgContainer">
          <img
            className="Image__image--full"
            src={urlFor(i.asset).url()}
          />
          <div className="Image__alt u-center-text">{i.alt}</div>
          {/* <Image
            // src={urlFor({ i.asset, i.crop, i.hotspot }).url()}
            asset={i.asset}
            alt={i.alt}
            position={i.position}
            crop={i.crop}
            hotspot={i.hotspot}
          /> */}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
