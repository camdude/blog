import { useState } from "react";
import { urlFor } from "../lib/api";
import Modal from "./Modal";

const Image = ({ asset, alt, position = "center", crop, hotspot }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen ? (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <img
            className="Image__image--full"
            src={urlFor({ asset, crop, hotspot }).url()}
          />
          <div className="Image__alt u-center-text">{alt}</div>
        </Modal>
      ) : (
        ""
      )}

      <div className={`Image__imgContainer Image__imgContainer--${position}`}>
        <img
          className="Image__image"
          src={urlFor({ asset, crop, hotspot }).width(250).fit("max").url()}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        />
        <div className="Image__alt">{alt}</div>
      </div>
    </>
  );
};

export default Image;
