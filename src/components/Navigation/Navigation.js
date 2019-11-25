import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Navigation.css";

const Navigation = props => {
  return (
    <div className="rmdb-navigator">
      <div className="rmdb-navigator content">
        <Link to="/home">
          <p>Home</p>
        </Link>
        <p>/</p>
        <p>{props.movie}</p>
      </div>
    </div>
  );
};

Navigation.propTypes = {};

export default Navigation;
