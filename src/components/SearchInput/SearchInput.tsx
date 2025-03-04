import { ChangeEvent } from "react";

import "./index.scss";

interface Props {
  placeholder: string,
  debounce: number,
  onChange: (e: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
}

const SearchInput = (props: Props) => {
  const { placeholder, debounce, onChange } = props;
  let isCalling = false;

  const debounceFn = (fn: any, event: any) => {
    if (isCalling) return;

    isCalling = true;

    setTimeout(() => {
      fn(event);
      isCalling = false;
    }, debounce);
  };

  return (
    <input
      className="search-input"
      placeholder={placeholder}
      onChange={(e) => debounceFn(onChange, e)}
      type="search"
    />
  )
};

export default SearchInput;