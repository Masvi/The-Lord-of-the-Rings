import { ChangeEvent, useEffect, useState } from "react";

import "./index.scss";
import Movie from "../../models/Movie";
import { fetchMovies, fetchQuote } from "../../services";

import { Card, Header, Modal } from "../../components";

import { ModalProps } from "../../components/Modal/Modal";

import { calculateMovieAverages, sortMovies } from '../../utils';

interface Average {
  runtime: number;
  budget: number;
}

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [unfiltered, setUnfiltered] = useState<Movie[]>([]);
  const [average, setAverage] = useState<Average>({ runtime: 0, budget: 0 })
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<ModalProps['data']>({});

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

  const handleSort = (e: ChangeEvent<HTMLInputElement>) => {
    const sortedMovies = sortMovies({ movieList, e });
    setMovieList(sortedMovies)
  };

  const handleOpenModal = (movie: Movie) => {
    const { _id } = movie;

    setMovieData({ movie, complete: false })
    setOpenModal(true);

    if (_id) {
      fetchQuote(_id).then((data) => {
        setMovieData({ quote: data, movie, complete: true });
      });
    }
  };

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovieList(data);
      setUnfiltered(data);
      const avareges = calculateMovieAverages(data);
      setAverage(avareges);

    }).catch((e) => console.log(e))
  }, []);

  return (
    <div className="home" data-testid="movie-home">
      <Modal
        data={movieData}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Header
        handleChange={handleSearchChange}
        handleChangeSort={(e) => handleSort(e)}
        average={average}
      />
      <div className="home__list" data-testid="movie-list">
        {movieList.length > 0 ? (movieList).map((movie) =>
          <Card
            handleClick={() => handleOpenModal(movie)}
            key={movie.name}
            movie={movie}
          />
        ) : <>Loading...</>}
      </div>
    </div>
  )
};

export default Home;