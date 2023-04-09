import { useEffect, useState } from "react"

import "./index.scss";
import Movie from "../../models/Movie";
import { fetchMovies } from "../../services";

import Card from "../../components/Card";
import Header from "../../components/Header";

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovieList(data);
    });
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="home__list">
        {(movieList as Movie[]).map((movie) => <Card movie={movie} />)}
      </div>
    </div>
  )
};

export default Home;