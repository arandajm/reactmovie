import React, { Component } from "react";
import HeroImage from "../../HeroImage/HeroImage";
import SearchBar from "../../SearchBar/SearchBar";
import FourColGrid from "../../FourColGrid/FourColGrid";
import MovieThumb from "../../MovieThumb/MovieThumb";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import Spinner from "../../Spinner/Spinner";

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="rmdb-home">
        <HeroImage />
        <SearchBar />
        <FourColGrid />
        <Spinner />
        <LoadMoreBtn />
      </div>
    );
  }
}

export default Home;
