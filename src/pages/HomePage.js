import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faBars, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import logo from '../logo.svg'
import '../index.css'

import getCategory from '../utils/getCategory'
import getCountry from '../utils/getCountry'
import getRottenTomatoesRating from '../utils/getRottenTomatoesRating'

const HomePage = () => {
    const API_KEY = "02d99523fc7b7ac4eca40e5e0aa9a4c8"
    const API_URL = "https://api.themoviedb.org/3";
    const [movies, setMovies] = useState([]);
    const [topRatedMovie, setTopRatedMovie] = useState([]);

    const fetchMovies = async () => {
        const { data:{results} } = await axios.get(`${API_URL}/discover/movie`, {
            params: {
                api_key: API_KEY
            }
        });

        const moviesWithDetails = await Promise.all(results.map(async (movie) => {
            const { data } = await axios.get(`${API_URL}/movie/${movie.id}`, {
              params: {
                api_key: API_KEY,
                append_to_response: 'release_dates'
              }
            });
    
            // Extract the necessary information (IMDb and Rotten Tomatoes ratings, country, category, etc.)
            const imdbRating = (data.vote_average * 10).toFixed(1);
            const rottenTomatoesRating = getRottenTomatoesRating(data);
            const country = getCountry(data);
            const category = getCategory(data);
    
            // Return a new movie object with the extracted information
            return {
              ...movie,
              imdbRating,
              rottenTomatoesRating,
              country,
              category
            };
          }
        ));
        setMovies(moviesWithDetails);
    }

    const renderMovies = () => {
        const displayMovies = movies.slice(0, 10);
        return displayMovies.map(movie => (
            <MovieCard
                key={movie.id}
                movie={movie}
            />
        ));
    }

    const fetchTopRatedMovie = async () => {
        const { data:{results} } = await axios.get(`${API_URL}/movie/popular`, {
            params: {
                api_key: API_KEY
            }
        });
        const randIndex = Math.floor(Math.random() * (results.length + 1));
        setTopRatedMovie(results[randIndex]);
        console.log('Top rated', topRatedMovie);
    }

    useEffect(() => {
        fetchMovies();
        fetchTopRatedMovie();
    }, []);

    const headerStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${topRatedMovie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '33rem',
        width: '100%',
        padding: '0.6rem 5rem'
    }

    const errNoBackground = {
        background: 'black'
    }

    console.log(movies)
    return (
        <div className='App'>
            <header style={topRatedMovie.backdrop_path ? headerStyle : errNoBackground}>
                <nav>
                    <img src={logo}></img>
                    <SearchBar />
                    <span className='nav-sign-in'>
                        Sign in
                        <FontAwesomeIcon icon={faBars} className='nav-sign-in-icon'/>
                    </span>
                </nav>
                <div className='top-rated-movie'>
                    <div className='top-rated-movie-title'>{topRatedMovie.title}</div>
                    <div className='top-rated-movie-rating'>{(topRatedMovie.vote_average * 10).toFixed(1)} / 100</div>
                    <div className='top-rated-movie-overview'>{topRatedMovie.overview}</div>
                    <div className="watch-trailer-container">
                        <FontAwesomeIcon icon={faCirclePlay} className="play-icon" />
                        <div className="watch-trailer">WATCH TRAILER</div>
                    </div>
                </div>
            </header>

            <section className='featured-movies'>
                <span className='featured-movies-title'>Featured Movie</span>
                <span className='featured-movies-detail'>
                    See more 
                    <FontAwesomeIcon icon={faChevronRight} className="my-icon" />
                </span>
                <div className='movie-cards'>
                    {renderMovies()}
                </div>
            </section>

            <footer>

            </footer>
        </div>
        
    );
}

export default HomePage;