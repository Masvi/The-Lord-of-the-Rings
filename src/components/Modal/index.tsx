import "./index.scss";
import Quote from "../../models/Quote";
import Movie from "../../models/Movie";

interface Props {
  isOpen: boolean;
  handleClick: () => void;
  data: {
    movie: Movie;
    quote: Quote[];
  }
}

const Modal = (props: Props) => {
  const { isOpen, handleClick, data } = props;
  const { movie, quote } = data;

  return isOpen ? (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h1 className="modal__title">{movie?.name}</h1>
        </div>
        <div className="modal__body">
          {quote?.length > 0 ?
            <p className="modal__dialog">
              "{quote[0].dialog}"
            </p>
            : "no speech found"
          }
        </div>
        <div className="modal__footer">
          <button
            className="modal__close-btn"
            onClick={() => handleClick()}
          >
            close
          </button>
        </div>
      </div>
    </div>
  ) : null;

};

export default Modal;