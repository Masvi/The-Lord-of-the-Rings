import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "../Modal";

const mockData = {
  movie: {
    _id: 'movie_id_1',
    name: 'movieName',
    academyAwardNominations: 10,
    academyAwardWins: 2,
    boxOfficeRevenueInMillions: 290,
    budgetInMillions: 291,
    rottenTomatoesScore: 94,
    runtimeInMinutes: 559,
  },
  quote: [{
    character: "5cd99d4bde30eff6ebccfea0",
    dialog: "Sauron's wrath will be terrible, his retribution swift.",
    id: "5cd96e05de30eff6ebcce9b8",
    movie: "5cd95395de30eff6ebccde5b",
    _id: "5cd96e05de30eff6ebcce9b8"
  }],
  complete: true,
};


describe("Modal", () => {
  test("should render correctly", () => {
    render(<Modal isOpen={true} onClose={() => null} data={mockData} />);

    expect(screen.getByText(/movieName/i)).toBeInTheDocument();
    expect(screen.getByText(/Sauron's wrath will be terrible, his retribution swift./i)).toBeInTheDocument();
  });

  test("should display loading when complete is false", () => {
    render(<Modal isOpen={true} onClose={() => null} data={{ ...mockData, complete: false }} />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("should call on close function correctly", async () => {
    const onCloseMock = jest.fn();
    render(<Modal isOpen={true} onClose={onCloseMock} data={mockData} />);

    const button = screen.getByRole('button', {
      name: /close/i
    });
    await userEvent.click(button);

    expect(onCloseMock).toHaveBeenCalled();
  });

});
