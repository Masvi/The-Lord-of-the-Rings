import { ChangeEvent } from "react";

import Movie from "../models/Movie";

type Sort = {
  movieList: Movie[];
  e: ChangeEvent<HTMLInputElement>;
};

export const calculateMovieAverages = (data: Movie[]) => {
  if (data.length > 0) {
    let runtime = data.reduce((acc, movie) => acc + movie.runtimeInMinutes, 0);
    let budget = data.reduce((acc, movie) => acc + movie.budgetInMillions, 0);
    runtime = runtime / data?.length;
    budget = budget / data?.length;
    return { runtime, budget };
  }
  return { runtime: 0, budget: 0 };
};

export const sortMovies = ({ movieList, e }: Sort) => {
  const { value } = e.target;

  const sortedMovies = movieList.sort((first, second) => {
    const movieA = first.name.toLowerCase();
    const movieB = second.name.toLowerCase();

    const firstMovie = value === "asc" ? movieA : movieB;
    const secondMovie = value === "asc" ? movieB : movieA;

    if (firstMovie > secondMovie) {
      return 1;
    } else if (firstMovie < secondMovie) {
      return -1;
    } else {
      return 0;
    }
  });
  return [...sortedMovies];
};
