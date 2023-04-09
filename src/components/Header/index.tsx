import "./index.scss";

const Header = () => {

  return (
    <div className="header">
      <div className="header__ave-infos">
        <h1>The Lord of the Rings movies</h1>
        <p>Average movie runtime: min</p>
        <p>Average movie budget: M</p>
      </div>
      <div className="header__inputs">
        <input placeholder="search by name"></input>
        <select>
          <option>order desc</option>
          <option>order asc</option>
        </select>
      </div>
    </div>
  )
};

export default Header;