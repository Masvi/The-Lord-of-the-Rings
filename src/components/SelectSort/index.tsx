import { ChangeEvent } from "react";
import "./index.scss";

interface Props {
  handleChangeSort: (e: ChangeEvent<HTMLInputElement>) => any;
}

const SelectSort = (props: Props) => {
  const { handleChangeSort } = props;

  return (
    <select
      className="select-sort"
      onChange={(e: any) => handleChangeSort(e)}
    >
      <option value="asc">Sort by Asc</option>
      <option value="desc">Sort by Desc</option>
    </select>
  )
};

export default SelectSort;