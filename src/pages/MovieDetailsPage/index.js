import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronDown,
  faTicket,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";
import Loader from "../../components/Loader";
import axiosClient from "../../services/axiosClient";

const MovieDetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);

  try {
    useEffect(() => {
      const fetchData = async () => {
        const { data } = await axiosClient.get(`/movie/${params.id}`, {
          params: {
            append_to_response: "credits",
          },
        });
        setMovie(data);
      };
      fetchData();
    }, [params.id]);
  } catch (error) {
    toast.error(
      "An error occured while fetching movies. Please try again later"
    );
    console.error(error);
  }

  return (
    <>
      {!movie ? (
        <Loader />
      ) : (
        <div>
          <div className="movie-container">
            <div className="movie-header">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt=""
              />
              <div className="overlay"></div>
            </div>
            <div className="movie-text">
              <div className="top">
                <div className="left">
                  <span>
                    <span data-testid="movie-title">{movie.title}</span> •{" "}
                    <span data-testid="movie-release-date">
                      {new Date(movie.release_date).toUTCString()}
                    </span>
                    • PG-13 •{" "}
                    {typeof movie.runtime !== "number" ? (
                      <span>N/A</span>
                    ) : (
                      <span>
                        <span data-testid="movie-runtime">{movie.runtime}</span>{" "}
                        Minutes
                      </span>
                    )}
                  </span>
                  {movie.genres &&
                    movie.genres.map((genre) => (
                      <small key={genre.id}>{genre.name}</small>
                    ))}
                </div>
                <div className="right">
                  <FontAwesomeIcon icon={faStar} />
                  <span>8.5</span>
                  <span>|</span>
                  <span>350k</span>
                </div>
              </div>
              <div className="main">
                <div className="left">
                  <p className="about" data-testid="movie-overview">
                    {movie.overview}
                  </p>
                  <p>
                    <span>Director:</span>&nbsp;
                    <span>Joseph Kosinski</span>
                  </p>
                  <p>
                    <span>Writers:</span>&nbsp;
                    <span>Jim Cash, Jack Epps Jr, Peter Craig</span>
                  </p>
                  <p>
                    <span>Stars:</span>&nbsp;
                    <span>Tom Cruise, Jennifer Connelly, Miles Teller</span>
                  </p>
                  <div className="rated">
                    <span className="first">Top rated movie #65</span>
                    <span className="second">
                      <span>Awards 9 nominations</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  </div>
                </div>
                <div className="right">
                  <Link>
                    <FontAwesomeIcon icon={faTicket} />
                    <span>See Showtimes</span>
                  </Link>
                  <Link>
                    <FontAwesomeIcon icon={faList} />
                    <span>More watch options</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MovieDetailsPage;
