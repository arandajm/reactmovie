import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MovieThumb.css";
//You can define props like a object (destructuring) => props =>  clickeable, movieId, movieName, image
const MovieThumb = ({ clickeable, movieId, movieName, image }) => {
  return (
    <div className="rmdb-moviethumb">
      {clickeable ? (
        <Link
          to={{
            pathname: `/${movieId}`,
            movieName: `${movieName}`
          }}
        >
          <img src={image} alt="moviethumb" />
        </Link>
      ) : (
        <img src={image} alt="moviethumb" />
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
