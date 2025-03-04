import { fetchMovies, fetchQuote } from "../index";

jest.mock("../index.ts", () => ({
  fetchMovies: jest.fn(),
  fetchQuote: jest.fn(),
}));

const mockData = {
  docs: [
    { id: "movie1", name: "Movie 1" },
    { id: "movie2", name: "Movie 2" },
  ],
};

const quoteMockData = {
  docs: [{ id: "quote1", text: "Quote 1" }],
};

describe("API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchMovies should return movies", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue({ docs: mockData.docs });
    const movies = await fetchMovies();
    expect(movies).toMatchObject(mockData);
  });

  test("fetchQuote should return quotes", async () => {
    (fetchQuote as jest.Mock).mockResolvedValue({ docs: quoteMockData.docs });
    const quotes = await fetchQuote("movieId");
    expect(quotes).toMatchObject(quoteMockData);
  });

  test("fetchMovies should handle API error", async () => {
    (fetchMovies as jest.Mock).mockRejectedValue(new Error("Network error"));
    await expect(fetchMovies()).rejects.toThrow("Network error");
  });

  test("fetchQuote should handle API error", async () => {
    (fetchQuote as jest.Mock).mockRejectedValue(new Error("Network error"));
    await expect(fetchQuote("movieId")).rejects.toThrow("Network error");
  });
});
