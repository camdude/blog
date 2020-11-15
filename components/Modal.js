import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ closeModal, children }) => {
  return (
    <div className="Modal">
      <div className="Modal__overlay">
        <div className="Modal__content">
          <FontAwesomeIcon
            className="Modal__close"
            icon="times"
            fixedWidth
            onClick={closeModal}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
