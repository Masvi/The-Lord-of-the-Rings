import api from "../api";

import Movie from "../models/Movie";

export const fetchMovies = (): Promise<Movie[]> =>
  api.get("/v2/movie", { params: { limit: 8 } }).then(({ data }) => data.docs);
