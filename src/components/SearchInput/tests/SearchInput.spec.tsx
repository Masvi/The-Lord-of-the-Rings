import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchInput from "../SearchInput";

describe("SearchInput", () => {
  test("should render correctly", async () => {
    const onChangeMock = jest.fn();
    render(<SearchInput placeholder="search input" debounce={100} onChange={(e) => onChangeMock(e)} />);
    const inputElement = screen.getByPlaceholderText(/search input/i);

    expect(inputElement).toBeInTheDocument();
  });

  test("should call onchange when type", async () => {
    const onChangeMock = jest.fn();
    render(<SearchInput placeholder="search input" debounce={100} onChange={(e) => onChangeMock(e)} />);

    const inputElement = screen.getByPlaceholderText(/search input/i);
    await userEvent.type(inputElement, 'Hello');
    
    await waitFor(() =>
      expect(onChangeMock).toHaveBeenCalledTimes(1)
    );
  });
});