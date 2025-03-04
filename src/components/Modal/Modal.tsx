import "./index.scss";
import Quote from "../../models/Quote";
import Movie from "../../models/Movie";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    movie?: Movie;
    quote?: Quote[];
    complete?: boolean;
  }
}
const Modal = (props: ModalProps) => {
  const { isOpen, onClose, data } = props;
  const { movie, quote = [], complete } = data;

  return isOpen ? (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h1 className="modal__title">{movie?.name}</h1>
        </div>
        <div className="modal__body">
          {!complete ? (
            <div>Loading...</div>
          ) : quote.length > 0 ? (
            <p className="modal__dialog">"{quote[0].dialog}"</p>
          ) : (
            <div>No speach</div>
          )}
        </div>
        <div className="modal__footer">
          <button
            className="modal__close-btn"
            onClick={() => onClose()}
          >
            close
          </button>
        </div>
      </div>
    </div>
  ) : null;

};

export default Modal;