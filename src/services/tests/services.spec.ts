import { fetchMovies, fetchQuote } from "../index";
import api from "../../api";

jest.mock("../../api");

const mockedApi = api as jest.Mocked<typeof api>;

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
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
    mockedApi.get.mockResolvedValueOnce({ data: mockData });
    const result = await fetchMovies();

    expect(mockedApi.get).toHaveBeenCalledWith("/v2/movie", {
      params: { limit: 8 },
    });

    expect(result).toEqual(mockData.docs);
  });

  test("fetchQuote should return quotes", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: quoteMockData });
    const quotes = await fetchQuote("movieId");

    expect(quotes).toMatchObject(quoteMockData.docs);
  });

  test("fetchMovies should handle API error", async () => {
    mockedApi.get.mockRejectedValue(new Error("Network error"));
    await expect(fetchMovies()).rejects.toThrow("Network error");
  });

  test("fetchQuote should handle API error", async () => {
    mockedApi.get.mockRejectedValue(new Error("Network error"));
    await expect(fetchQuote("movieId")).rejects.toThrow("Network error");
  });
});
