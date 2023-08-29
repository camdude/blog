import Image from "./Image";

const Gallery = ({ images }) => {
  return (
    <div className="Gallery">
      {images.map((i) => (
        <div key={i._key} className="Gallery__imgContainer">
          <Image
            asset={i.image}
            alt={i.alt}
            position={i.position}
            crop={i.crop}
            hotspot={i.hotspot}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
