import React from 'react';

const MovieCard = ({ movie }) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
    
    return (
        <div className={'movie-card card'} data-testid='movie-card'>
            {movie.poster_path ? <img className={'movie-cover'} src={`${IMAGE_PATH}${movie.poster_path}`} alt='Movie Poster' data-testid='movie-poster'/> : null}
            <div className='movie-country-and-release-date'>
                {movie.country}, <span data-testid='movie-release-date'>{movie.release_date}</span>
            </div>
            <div className='movie-title' data-testid= 'movie-title'>
                {movie.title}
            </div> 
            <div className='movie-rating'>
                {movie.imdbRating} / 100
                {movie.rottenTomatoesRating}
            </div>
            <div className='movie-category'>
                {movie.category}
            </div>
        </div>
    )
}

export default MovieCard;