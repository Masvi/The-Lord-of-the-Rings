import { useEffect } from "react";
import "./index.scss";
import { fetchMovies } from "../../api";

const Home = () => {

  useEffect(() => {
    fetchMovies();
  }, []);
  return (<>home</>)
};

export default Home;