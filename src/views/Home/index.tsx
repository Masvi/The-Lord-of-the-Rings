import { useEffect, useState } from "react"

import "./index.scss";
import Movie from "../../models/Movie";
import { fetchMovies } from "../../services";

import Card from "../../components/Card";

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovieList(data);
    });
  }, []);

  return (
    <div className="home">
      <div className="home__header">
        <h1>The Lord of the Rings movies</h1>
      </div>
      <div className="home__list">
        {(movieList as Movie[]).map((movie) => <Card movie={movie} />)}
      </div>
    </div>
  )
};

export default Home;