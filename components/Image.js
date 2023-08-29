import { useState } from "react";
import NextImage from "next/image";
import { urlFor } from "../lib/api";
import Modal from "./Modal";

const Image = ({ asset, alt, position, crop, hotspot }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen ? (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <NextImage
            className="Image__image--full"
            src={urlFor({ asset, crop, hotspot }).url()}
            width={asset.metadata.dimensions.width}
            height={asset.metadata.dimensions.height}
            alt={alt}
            placeholder="blur"
            // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU8E6uBwAC0AFX4KNg9wAAAABJRU5ErkJggg=="
            blurDataURL={asset.metadata.lqip}
            loading="lazy"
          />
          <div className="Image__alt u-center-text">{alt}</div>
        </Modal>
      ) : (
        ""
      )}

      <div className={`Image__imgContainer Image__imgContainer--${position}`}>
        <NextImage
          className="Image__image"
          src={urlFor({ asset, crop, hotspot }).fit("max").url()}
          width={asset.metadata.dimensions.width}
          height={asset.metadata.dimensions.height}
          alt={alt}
          placeholder="blur"
          // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU8E6uBwAC0AFX4KNg9wAAAABJRU5ErkJggg=="
          blurDataURL={asset.metadata.lqip}
          loading="lazy"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        />
        {/* <img
          className="Image__image"
          src={urlFor({ asset, crop, hotspot }).fit("max").url()}
          
        /> */}
        <div className="Image__alt">{alt}</div>
      </div>
    </>
  );
};

export default Image;
