import React from "react";
import { Link } from "react-router-dom";

import imdb from "../assets/imdb.svg";

const MovieCard = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  return (
    <Link to={`/movies/${movie.id}`}>
      <div className={"movie-card card"} data-testid="movie-card">
        {movie.poster_path ? (
          <img
            className={"movie-cover"}
            src={`${IMAGE_PATH}${movie.poster_path}`}
            alt="Movie Poster"
            data-testid="movie-poster"
          />
        ) : null}
        <div className="movie-country-and-release-date">
          {movie.country}
          <span data-testid="movie-release-date">{movie.release_date}</span>
        </div>
        <div className="movie-title" data-testid="movie-title">
          {movie.title}
        </div>
        <div className="movie-rating">
          <img src={imdb} alt="IMdb Logo" className="imdb-logo"></img>
          {movie.imdbRating} / 100
        </div>
        <div className="movie-category">{movie.category}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
