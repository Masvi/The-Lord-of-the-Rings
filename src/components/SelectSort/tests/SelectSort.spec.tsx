import { render, screen, waitFor } from "@testing-library/react";

import SelectSort from "../SelectSort";
import userEvent from "@testing-library/user-event";

describe("SelectSort", () => {
  test("should render correctly", async () => {
    render(<SelectSort handleChangeSort={() => null}/>);
    const sortElement = screen.getByRole('combobox');
   
    expect(sortElement).toBeInTheDocument();
  });

  test("should call handle function correctly", async () => {
    const handleMock = jest.fn();
    render(<SelectSort handleChangeSort={(e) => handleMock(e)}/>);

    const sortElement = screen.getByRole('combobox');
    const optionToSelect = screen.getByRole('option', { name: 'Sort by Desc' });
    await userEvent.selectOptions(sortElement, optionToSelect);

    await waitFor(() => {
      expect(handleMock).toHaveBeenCalled();
    });
  });
});