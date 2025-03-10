import "./index.scss";

import Movie from "../../models/Movie";
import Award from "../../assets/award.svg";
import MovieLogo from "../../assets/movie-logo.svg"

interface Props {
  movie: Movie,
  handleClick: () => void;
}

const Card = (props: Props) => {

  const { movie, handleClick } = props;

  return (
    <div
      className="card"
      onClick={handleClick}
      data-testid="card"
    >
      <div className="card__cover">
        <img src={MovieLogo} alt="movie-logo" width={48} height={48} />
      </div>
      <div className="card__infos">
        <div className="card__container">
          <h1 data-testid="card-title">{movie.name}</h1>
          <span className="card__runtime">{movie.runtimeInMinutes} min</span>
          <div className="card__box card__box-row">
            <img className="card__icon" src={Award} alt="award" width={20} height={20} />
            <p className="card__awards">
              {movie.academyAwardWins} wins and {movie.academyAwardNominations} nominations
            </p>
          </div>
        </div>
        <div className="card__container card__container-row">
          <div className="card__box">
            <p className="card__budget">Budget</p>
            <span>{movie.budgetInMillions}M</span>
          </div>
          <div className="card__box">
            <p className="card__budget">Revenue</p>
            <span>{movie.boxOfficeRevenueInMillions}M</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Card;