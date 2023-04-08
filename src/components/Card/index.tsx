import "./index.scss";

const Card = () => {
  return (
    <div className="card">
      <div className="card__cover" />
      <div className="card__infos">
        <div className="card__container">
          <h1>Title</h1>
          <span>98min</span>
          <p>2 wins and 2 nominations</p>
        </div>
        <div className="card__container card__container-row">
          <p className="card__budget">
            Budget
            <span>399</span>
          </p>
          <p className="card__revenue">
            Revenue
            <span>490</span>
          </p>
        </div>
      </div>
    </div>
  )
};

export default Card;