
import { render, screen, within } from "@testing-library/react"
import { fetchMovies } from "../../../services";

import Home from "../Home";
import userEvent from "@testing-library/user-event";

jest.mock('axios');

const mockData = {
  docs: [
    {
      _id: 'movie_id_1',
      name: 'movieName',
      academyAwardNominations: 10,
      academyAwardWins: 2,
      boxOfficeRevenueInMillions: 290,
      budgetInMillions: 291,
      rottenTomatoesScore: 94,
      runtimeInMinutes: 559,
    },
    {
      _id: 'movie_id_2',
      name: 'movieName 2',
      academyAwardNominations: 11,
      academyAwardWins: 2,
      boxOfficeRevenueInMillions: 290,
      budgetInMillions: 391,
      rottenTomatoesScore: 94,
      runtimeInMinutes: 659,
    },
    {
      _id: 'movie_id_3',
      name: 'movieName 3',
      academyAwardNominations: 11,
      academyAwardWins: 2,
      boxOfficeRevenueInMillions: 190,
      budgetInMillions: 191,
      rottenTomatoesScore: 94,
      runtimeInMinutes: 600,
    }
  ],
}

jest.mock('../../../services', () => ({
  fetchMovies: jest.fn(),
}));

describe("Home", () => {
  test("should render correctly", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue([]);
    const { container } = render(<Home />);

    expect(await screen.findByTestId('movie-home')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("should display header and loading correctly for empty data", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue([]);
    render(<Home />);

    expect(await screen.findByText(/The Lord of the Rings movies/i)).toBeInTheDocument();
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  });

  test("should display list element correctly", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue([mockData.docs[0]]);
    render(<Home />);

    expect(await screen.findByText(/movieName/i)).toBeInTheDocument();
    expect(await screen.findByText(/2 wins and 10 nominations/i)).toBeInTheDocument();
    expect(await screen.findByText(/291M/i)).toBeInTheDocument();
    expect(await screen.findByText(/290M/i)).toBeInTheDocument();
  });

  test("should return avarage values correctly", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue([...mockData.docs]);
    render(<Home />);

    expect(await screen.findByText(/Average movie runtime: 606 min/i)).toBeInTheDocument();
    expect(await screen.findByText(/Average movie budget: 291 M/i)).toBeInTheDocument();
  });

  test("should sort elements values correctly", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue([...mockData.docs]);
    render(<Home />);

    const selectElement = screen.getByRole('combobox');
    const optionToSelect = screen.getByRole('option', { name: 'Sort by Desc' });
    await userEvent.selectOptions(selectElement, optionToSelect);
    const movieListElement = await screen.findAllByTestId('card-title');

    expect(movieListElement).toHaveLength(3);
    expect(movieListElement.map(title => title.textContent)).toEqual(['movieName 3', 'movieName 2', 'movieName']);
  });
});