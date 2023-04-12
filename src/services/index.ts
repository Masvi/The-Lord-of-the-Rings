import api from "../api";

import Movie from "../models/Movie";
import Quote from "../models/Quote";

export const fetchMovies = async (): Promise<Movie[]> =>
  api.get("/v2/movie", { params: { limit: 8 } }).then(({ data }) => data?.docs);

export const fetchQuote = async (id: string): Promise<Quote[]> =>
  api
    .get(`/v2/movie/${id}/quote`, { params: { limit: 1 } })
    .then(({ data }) => data?.docs);
