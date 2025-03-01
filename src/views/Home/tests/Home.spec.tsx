
import { render, screen } from "@testing-library/react"
import Home from "../Home";

jest.mock('@app-components/Header', () => () => <>Header</>)

describe("Home", () => {
  test("should render correctly", () => {
    render(<Home />);

    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});