import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faBars,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../components/Footer/index";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import logo from "../assets/logo.svg";
import imdb from "../assets/imdb.svg";
import getCategory from "../utils/getCategory";
import getCountry from "../utils/getCountry";
import "../index.css";

const HomePage = () => {
  const API_KEY = "02d99523fc7b7ac4eca40e5e0aa9a4c8";
  const API_URL = "https://movie-box-api-9yck.onrender.com";
  const [movies, setMovies] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);

  const fetchMovies = async (query) => {
    try {
      // Set the fetch type to "search" if a query is passed as a parameter, otherwise, set it to "popular"
      const fetchType = query ? "search" : "popular";
      const {
        data: { results },
      } = await axios.get(
        fetchType === "popular"
          ? `${API_URL}/movie/${fetchType}`
          : `${API_URL}/${fetchType}/movie`,
        {
          params: {
            api_key: API_KEY,
            query: query,
          },
        }
      );

      const moviesWithDetails = await Promise.all(
        results.map(async (movie) => {
          const { data } = await axios.get(`${API_URL}/movie/${movie.id}`, {
            params: {
              api_key: API_KEY,
              append_to_response: "release_dates",
            },
          });

          // Extract the necessary information (IMDb ratings, country, category and category)
          const imdbRating = (data.vote_average * 10).toFixed(1);
          const country = getCountry(data);
          const category = getCategory(data);

          // Return a new movie object with the extracted information
          return {
            ...movie,
            imdbRating,
            country,
            category,
          };
        })
      );
      setMovies(moviesWithDetails);
    } catch (error) {
      toast.error(
        "An error occured while fetching movies. Please try again later"
      );
      console.error(error);
    }
  };

  const renderMovies = () => {
    const displayMovies = movies;
    return displayMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  };

  const fetchTopRatedMovie = async () => {
    try {
      // Fetch the top rated movies
      const {
        data: { results },
      } = await axios.get(`${API_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
        },
      });

      // Select a random movie from the results object and set it as the top rated movie
      const randIndex = Math.floor(Math.random() * (results.length + 1));
      setTopRatedMovie(results[randIndex]);
    } catch (error) {
      toast.error(
        "An error occured while fetching movies. Please try again later"
      );
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchTopRatedMovie();
  }, []);

  return (
    <div className="App">
      {!topRatedMovie ? (
        <Loader />
      ) : (
        <header
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${topRatedMovie.backdrop_path})`,
          }}
        >
          <nav>
            <img src={logo} alt="Logo"></img>
            {!movies ? <Loader /> : <SearchBar onSearch={fetchMovies} />}
            <span className="nav-sign-in">
              Sign in
              <FontAwesomeIcon icon={faBars} className="nav-sign-in-icon" />
            </span>
          </nav>
          <div className="top-rated-movie">
            <div className="top-rated-movie-title">{topRatedMovie.title}</div>
            <div className="top-rated-movie-rating">
              <img src={imdb} alt="IMDb Logo" className="imdb-logo"></img>
              {(topRatedMovie.vote_average * 10).toFixed(1)} / 100
            </div>
            <div className="top-rated-movie-overview">
              {topRatedMovie.overview}
            </div>
            <div className="watch-trailer-container">
              <FontAwesomeIcon icon={faCirclePlay} className="play-icon" />
              <div className="watch-trailer">WATCH TRAILER</div>
            </div>
          </div>
        </header>
      )}

      <section className="featured-movies">
        <span className="featured-movies-title">Featured Movie</span>
        <span className="featured-movies-detail">
          See more {""}
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <div className="movie-cards">
          {!movies ? <Loader /> : renderMovies()}
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
