import { ChangeEvent } from "react";

import "./index.scss";
import SelectSort from "../SelectSort";
import SearchInput from "../SearchInput";

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
}

const Header = (props: Props) => {
  const { handleChange } = props;

  return (
    <div className="header">
      <div className="header__ave-infos">
        <h1>The Lord of the Rings movies</h1>
        <p>Average movie runtime: min</p>
        <p>Average movie budget: M</p>
      </div>
      <div className="header__inputs">
        <SearchInput
          onChange={handleChange}
          debounce={300}
          placeholder="search by name"
        />
        <SelectSort />
      </div>
    </div>
  )
};

export default Header;