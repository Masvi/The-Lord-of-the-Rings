import { ChangeEvent, useEffect, useState } from "react"

import "./index.scss";
import Movie from "../../models/Movie";
import { fetchMovies } from "../../services";

import Card from "../../components/Card";
import Header from "../../components/Header";

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
};

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [unFiltered, setUnFiltered] = useState<Movie[]>([]);

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
    setMovieList(unFiltered);
  };

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovieList(data);
      setUnFiltered(data);
    });
  }, []);

  return (
    <div className="home">
      <Header handleChange={handleSearchChange} />
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