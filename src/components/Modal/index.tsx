import "./index.scss";

interface Props {
  isOpen: boolean;
  handleClick: () => void;
}

const Modal = (props: Props) => {

  const { isOpen, handleClick } = props;

  return isOpen ? (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h1 className="modal__title">Movie name</h1>
        </div>
        <div className="modal__body">
          modal body
        <hr />
        </div>
        <div className="modal__footer">
          <button 
            className="modal__close-btn"
            onClick={handleClick}
          >
            close
          </button>
        </div>
      </div>
    </div>
  ) : null;

};

export default Modal;