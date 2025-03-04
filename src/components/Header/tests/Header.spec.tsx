import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "../Header";

const mockData = {
  runtime: 1000,
  budget: 2000,
};

describe("Header", () => {
  test("should render correctly", () => {
    render(<Header average={mockData} handleChange={() => null} handleChangeSort={() => null} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText(/Average movie runtime: 1000 min/i)).toBeInTheDocument();
    expect(screen.getByText(/Average movie budget: 2000 M/i)).toBeInTheDocument();
  });

  test("should call handle change when type on search", async () => {
    const handleSearch = jest.fn();
    render(<Header average={mockData} handleChange={handleSearch} handleChangeSort={() => null} />);

    const searchElement = screen.getByRole('searchbox');
    await userEvent.type(searchElement, 'something');

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalled();
    });
  });

  test("should call handle sort when click on it", async () => {
    const handleSort = jest.fn();
    render(<Header average={mockData} handleChange={() => null} handleChangeSort={handleSort} />);

    const sortElement = screen.getByRole('combobox');
    const optionToSelect = screen.getByRole('option', { name: 'Sort by Desc' });
    await userEvent.selectOptions(sortElement, optionToSelect);

    await waitFor(() => {
      expect(handleSort).toHaveBeenCalled();
    });
  });
});