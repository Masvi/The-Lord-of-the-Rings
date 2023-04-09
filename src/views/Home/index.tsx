import { ChangeEvent, useEffect, useState } from "react"

import "./index.scss";
import Movie from "../../models/Movie";
import { fetchMovies } from "../../services";

import Card from "../../components/Card";
import Header from "../../components/Header";

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [unfiltered, setUnfiltered] = useState<Movie[]>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value) {
      const filtered = movieList.filter((movie) => movie.name
        .toLowerCase()
        .includes(value.toLowerCase()));

      if (filtered.length > 0) {
        setMovieList([...filtered]);
      }
      return;
    }
    setMovieList(unfiltered);
  };

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const sortedMovies = movieList.sort((first, second) => {
      const movieA = first.name.toLowerCase();
      const movieB = second.name.toLowerCase();

      const firstMovie = value === 'asc' ? movieA : movieB
      const secondMovie = value === 'asc' ? movieB : movieA

      if (firstMovie > secondMovie) {
        return 1
      } else if (firstMovie < secondMovie) {
        return -1;
      } else {
        return 0;
      }
    })
    setMovieList([...sortedMovies])
  };

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovieList(data);
      setUnfiltered(data);
    });
  }, []);

  return (
    <div className="home">
      <Header
        handleChange={handleSearchChange}
        handleChangeSort={handleChangeSort}
      />
      <div className="home__list">
        {(movieList as Movie[]).map((movie) =>
          <Card
            key={movie.name}
            movie={movie}
          />
        )}
      </div>
    </div>
  )
};

export default Home;