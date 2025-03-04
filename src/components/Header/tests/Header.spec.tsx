import { render, screen } from "@testing-library/react";

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
});