import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MovieThumb.css";

const MovieThumb = props => {
  return (
    <div className="rmdb-moviethumb">
      {props.clickeable ? (
        <Link
          to={{
            pathname: `/${props.movieId}`,
            movieName: `${props.movieName}`
          }}
        >
          <img src={props.image} alt="moviethumb" />
        </Link>
      ) : (
        <img src={props.image} alt="moviethumb" />
      )}
    </div>
  );
};

//Check type of the props
MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
  clickeable: PropTypes.bool
};

export default MovieThumb;
