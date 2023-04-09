import { ChangeEvent } from "react";

import "./index.scss";
import SelectSort from "../SelectSort";
import SearchInput from "../SearchInput";

interface Average {
  runtime: number;
  budget: number;
}

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
  handleChangeSort: (e: ChangeEvent<HTMLInputElement>) => any;
  average: Average;
}

const Header = (props: Props) => {
  const { average, handleChange, handleChangeSort } = props;

  return (
    <div className="header">
      <div className="header__ave-infos">
        <h1>The Lord of the Rings movies</h1>
        <p>Average movie runtime: {average.runtime} min</p>
        <p>Average movie budget: {average.budget} M</p>
      </div>
      <div className="header__inputs">
        <SearchInput
          onChange={handleChange}
          debounce={300}
          placeholder="search by name"
        />
        <SelectSort handleChangeSort={handleChangeSort} />
      </div>
    </div>
  )
};

export default Header;