
import { render, screen } from "@testing-library/react";

import Card from "../Card";
import userEvent from "@testing-library/user-event";

const movieMock = {
  _id: 'movie_id_1',
  name: 'My favorite movie',
  academyAwardNominations: 10,
  academyAwardWins: 2,
  boxOfficeRevenueInMillions: 290,
  budgetInMillions: 291,
  rottenTomatoesScore: 94,
  runtimeInMinutes: 559,
};

describe("Card", () => {
  test("should render card component correctly", () => {
    render(<Card movie={movieMock} handleClick={() => null} />);

    const imageLogo = screen.getByAltText('movie-logo');
    const imageAward = screen.getByAltText('award');

    expect(imageLogo).toBeInTheDocument();
    expect(imageAward).toBeInTheDocument();
    expect(screen.getByText(/my favorite movie/i)).toBeInTheDocument();
    expect(screen.getByText(/2 wins and 10 nominations/i)).toBeInTheDocument();
    expect(screen.getByText(/559 min/i)).toBeInTheDocument();
    expect(screen.getByText(/291M/i)).toBeInTheDocument();
    expect(screen.getByText(/290M/i)).toBeInTheDocument();
  });

  test("should call function when click in the card component", async () => {
    const handleClick = jest.fn();
    render(<Card movie={movieMock} handleClick={() => handleClick()} />);
    
    const card = screen.getByTestId('card');
    await userEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});