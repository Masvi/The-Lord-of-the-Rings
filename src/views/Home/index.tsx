import { useEffect, useState } from "react";
import "./index.scss";

import Movie from "../../models/Movie";
import Card from "../../components/Card";
import { fetchMovies } from "../../services";

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovieList(data);
    });
  }, []);

  return (
    <>
      {movieList.map((movie) => <Card />)}
    </>

  )
};

export default Home;