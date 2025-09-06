import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
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
import axiosClient from "../services/axiosClient";
import useDebounce from "../hooks/useDebounce";
import "../index.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  console.log(movies);

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
      } = await axiosClient.get(`/movie/popular`, {
        params: {
          append_to_response: "production_countries,genres"
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
    fetchTopRatedMovie();
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Set the fetch type to "search" if a query is passed as a parameter, otherwise, set it to "popular"
        setIsLoading(true);
        const fetchType = debouncedQuery ? "search" : "popular";
        const {
          data: { results },
        } = await axiosClient.get(
          fetchType === "popular"
            ? `/movie/${fetchType}`
            : `/${fetchType}/movie`,
          {
            params: {
              query: debouncedQuery,
            },
          }
        );

        const moviesWithDetails = await Promise.all(
          results.map(async (movie) => {
            const { data } = await axiosClient.get(`/movie/${movie.id}`, {
              params: {
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
        setIsLoading(false);
        setMovies(moviesWithDetails);
      } catch (error) {
        toast.error(
          "An error occured while fetching movies. Please try again later"
        );
        console.error(error);
      }
    };
    fetchMovies();
  }, [debouncedQuery]);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
    }
  }, [query]);

  return (
    <div className="App">
      {!topRatedMovie ? (
        <Loader />
      ) : (
        <header
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${topRatedMovie.backdrop_path})`,
            height: !debouncedQuery ? "100vh" : "auto",
          }}
        >
          <nav
            style={{
              position: "sticky",
              top: "0px",
              zIndex: "1",
              backgroundColor:
                isScrolled || debouncedQuery ? "black" : "transparent",
              transition: "background-color 0.5s ease",
            }}
          >
            <img src={logo} alt="Logo"></img>
            {!movies ? (
              <Loader />
            ) : (
              <SearchBar
                onSearch={(searchTerm) => setQuery(searchTerm)}
                query={query}
              />
            )}
            <span className="nav-sign-in">
              Sign in
              <FontAwesomeIcon icon={faBars} className="nav-sign-in-icon" />
            </span>
          </nav>
          {!debouncedQuery && (
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
          )}
        </header>
      )}

      <section className="featured-movies">
        <div className="featured-movies-title">
          <span>
            {debouncedQuery
              ? movies.length === 0
                ? "No movies found :("
                : "Search results"
              : "Featured Movies"}
          </span>
        </div>
        <div className="movie-cards">
          {isLoading ? <Loader /> : renderMovies()}
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
