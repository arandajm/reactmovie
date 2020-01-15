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
    if (localStorage.getItem("HomeState")) {
      // Parse to json the item(state) that is located in the localstorage
      const state = JSON.parse(localStorage.getItem("HomeState"));
      this.setState({ ...state });
    } else {
      //Show loading spinner
      this.setState({ loading: true });
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&page=1`;
      this.fetchItems(endpoint);
    }
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
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en_US&query=${this.state.searchTerm}`;
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
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en_US&query=${
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
        this.setState(
          {
            //Append the new movies with the old movies
            movies: [...this.state.movies, ...result.results],
            heroImage: this.state.heroImage || result.results[0],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages
          },
          () => {
            if (this.state.searchTerm === "") {
              // After setState, call to callback funtion to set current state in the localstorage
              localStorage.setItem("HomeState", JSON.stringify(this.state));
            }
          }
        );
      });
  };

  render() {
    // ES6 destructuring the state
    const {
      movies,
      heroImage,
      loading,
      currentPage,
      totalPages,
      searchTerm
    } = this.state;
    // If you want to destruct the props, it is the same
    return (
      <div className="rmdb-home">
        {heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              title={heroImage.original_title}
              text={heroImage.overview}
            />
            <SearchBar callback={this.searchItem} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? "Search Result" : "Popular Movies"}
            loading={loading}
          >
            {movies.map((element, i) => {
              return (
                <MovieThumb
                  key={i}
                  clickeable={true}
                  image={
                    element.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                      : "./images/no.image.jpg"
                  }
                  movieId={element.id}
                  movieName={element.original_title}
                />
              );
            })}
          </FourColGrid>
        </div>
        {loading ? <Spinner /> : null}
        {currentPage <= totalPages && !loading ? (
          <LoadMoreBtn text="Load More" onClick={this.loadingMoreItems} />
        ) : null}
      </div>
    );
  }

  //TODO Create a endpoint factory method
}

export default Home;
