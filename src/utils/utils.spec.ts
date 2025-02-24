import Movie from "../models/Movie";
import { calculateMovieAverages, sortMovies } from "./index";

const mockData: Movie[] = [
  {
    _id: "movie_id_01",
    academyAwardNominations: 10,
    academyAwardWins: 1,
    budgetInMillions: 10,
    name: "Hobbit 01",
    boxOfficeRevenueInMillions: 10,
    rottenTomatoesScore: 10,
    runtimeInMinutes: 60,
  },
  {
    _id: "movie_id_02",
    academyAwardNominations: 10,
    academyAwardWins: 1,
    budgetInMillions: 11,
    name: "Hobbit 02",
    boxOfficeRevenueInMillions: 10,
    rottenTomatoesScore: 10,
    runtimeInMinutes: 70,
  },
];

const mockEvent = {
  target: {
    value: "asc",
  },
} as unknown as React.ChangeEvent<HTMLInputElement>;

describe("Utils", () => {
  describe("calculateMovieAverages", () => {
    test("should calculate movie averages correctly", () => {
      const result = calculateMovieAverages(mockData);
      expect(result).toMatchObject({ budget: 10.5, runtime: 65 });
    });

    test("should not break with an empty data", () => {
      const result = calculateMovieAverages([]);
      expect(result).toMatchObject({ budget: 0, runtime: 0 });
    });
  });

  describe("sortMovies", () => {
    test("should sort movies ASC correctly", () => {
      const result = sortMovies({ movieList: mockData, e: mockEvent });

      expect(result[0].name).toEqual("Hobbit 01");
      expect(result[1].name).toEqual("Hobbit 02");
    });

    test("should sort movies DESC correctly", () => {
      const result = sortMovies({
        movieList: mockData,
        e: {
          ...mockEvent,
          target: { value: "desc" } as EventTarget & HTMLInputElement,
        },
      });

      expect(result[1].name).toEqual("Hobbit 01");
      expect(result[0].name).toEqual("Hobbit 02");
    });
  });
});
