import React, { Component } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
} from "../../../config";
import HeroImage from "../../HeroImage/HeroImage";
import SearchBar from "../../SearchBar/SearchBar";
import FourColGrid from "../../FourColGrid/FourColGrid";
import MovieThumb from "../../MovieThumb/MovieThumb";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import Spinner from "../../Spinner/Spinner";

import "./Home.css";

class Home extends Component {
  // Initialize state
  state = {
    movies: [],
    HeroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };

  componentDidMount() {
    //Show loading spinner
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&page=1`;
    this.fetchItems(endpoint);
  }

  searchItem = searchTerm => {
    let endpoint;
    console.log(searchTerm);
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if (searchTerm === "") {
      // Popular endpoint
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&page=1`;
    } else {
      // Search enpoint
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en_US&query=${
        this.state.searchTerm
      }`;
    }
    this.fetchItems(endpoint);
  };

  loadingMoreItems = () => {
    //Show loading spinner
    this.setState({ loading: true });
    let endpoint = "";
    if (this.state.searchTerm === "") {
      // New Page endpoint
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&page=${this
        .state.currentPage + 1}`;
    } else {
      // Search enpoint
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        //Update the state
        this.setState({
          //Append the new movies with the old movies
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: true,
          currentPage: result.page,
          totalPages: result.total_pages
        });
      });
  };

  render() {
    return (
      <div className="rmdb-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${
                this.state.heroImage.backdrop_path
              }`}
              title={this.state.heroImage.original_title}
              text={this.state.heroImage.overview}
            />
            <SearchBar callback={this.searchItem} />
          </div>
        ) : null}
        <FourColGrid />
        <Spinner />
        <LoadMoreBtn />
      </div>
    );
  }

  //TODO Create a endpoint factory method
}

export default Home;
