import { ChangeEvent, useEffect, useState } from "react";

import "./index.scss";
import Movie from "../../models/Movie";
import Quote from "../../models/Quote";
import { fetchMovies, fetchQuote } from "../../services";

import Card from "../../components/Card";
import Modal from "../../components/Modal";
import Header from "../../components/Header";

interface Average {
  runtime: number;
  budget: number;
}

interface ModalData {
  movie: Movie;
  quote: Quote[];
}

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [unfiltered, setUnfiltered] = useState<Movie[]>([]);
  const [average, setAverage] = useState<Average>({ runtime: 0, budget: 0 })
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<ModalData>({} as ModalData);

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

  const handleAverage = (data: Movie[]) => {
    if (data.length > 0) {
      let runtime = data.reduce(
        (acc, movie) => acc + movie.runtimeInMinutes,
        0
      );
      let budget = data.reduce(
        (acc, movie) => acc + movie.budgetInMillions,
        0
      );
      runtime = runtime / data?.length
      budget = budget / data?.length
      setAverage({ runtime, budget });
    }
  };

  const handleOpenModal = (movie: Movie) => {
    setMovieData({} as ModalData);

    const { _id } = movie;
    if (_id) {
      fetchQuote(_id).then((data) => {
        setMovieData({ quote: data, movie });
      });
    }
    setOpenModal(!openModal);
  };

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovieList(data);
      setUnfiltered(data);
      handleAverage(data);
    })
  }, []);

  return (
    <div className="home">
      <Modal
        data={movieData}
        isOpen={openModal}
        handleClick={() => handleOpenModal({} as Movie)}
      />
      <Header
        handleChange={handleSearchChange}
        handleChangeSort={handleChangeSort}
        average={average}
      />
      <div className="home__list">
        {(movieList as Movie[]).map((movie) =>
          <Card
            handleClick={() => handleOpenModal(movie)}
            key={movie.name}
            movie={movie}
          />
        )}
      </div>
    </div>
  )
};

export default Home;