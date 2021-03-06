import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config";
import Navigation from "../Navigation/Navigation";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieInfoBar from "../MovieInfoBar/MovieInfoBar";
import FourColGrid from "../FourColGrid/FourColGrid";
import Actor from "../Actor/Actor";
import Spinner from "../Spinner/Spinner";
import "./Movie.css";

export class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
      // Parse to json the item(movie) that is located in the localstorage
      const state = JSON.parse(localStorage.getItem("HomeState"));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      // Build movie url
      const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en_US`;
      // Fetch the movie...
      this.fetchItems(endpoint);
    }
  }

  fetchItems = async endpoint => {
    // ES6 destructuring props
    const { movieId } = this.props.match.params.movieId;
    try {
      // use await to manage async calls
      const result = await (await fetch(endpoint)).json();
      if (result.status_code) {
        //Update loading
        this.setState({ loading: false });
      } else {
        //Update the movie state
        this.setState({
          //Append the new movie
          movie: result
        });
        const creditEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        // use await to manage async calls
        const creditResult = await (await fetch(creditEndpoint)).json();
        const directors = result.crew.filter(
          member => member.job === "Director"
        );
        // Set actors and directors in the state
        this.setState(
          {
            actors: creditResult.cast,
            directors: directors,
            loading: false
          },
          () => {
            // After setState, call to callback funtion to set current state about the movie in the localstorage
            localStorage.setItem(
              `${this.props.match.params.movieId}`,
              JSON.stringify(this.state)
            );
          }
        );
      }
    } catch (e) {
      console.log("There was an error: ", e);
    }
  };

  /* fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        if (result.status_code) {
          //Update loading
          this.setState({ loading: false });
        } else {
          //Update the movie state
          this.setState(
            {
              //Append the new movie
              movie: result
            },
            // call to callback function to fetch actors and
            () => {
              const endpoint = `${API_URL}movie/${}/credits?api_key=${API_KEY}`;
              //Fetch actors in the state
              fetch(endpoint)
                .then(result => result.json())
                .then(result => {
                  const directors = result.crew.filter(
                    member => member.job === "Director"
                  );
                  // Set actors and directors in the state
                  this.setState(
                    {
                      actors: result.cast,
                      directors: directors,
                      loading: false
                    },
                    () => {
                      // After setState, call to callback funtion to set current state about the movie in the localstorage
                      localStorage.setItem(
                        `${this.props.match.params.movieId}`,
                        JSON.stringify(this.state)
                      );
                    }
                  );
                })
                .catch(err => console.log(err));
            }
          );
        }
      });
  }; */

  render() {
    return (
      <div className="rmdb-movie">
        {this.state.movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
          </div>
        ) : null}
        {this.state.actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={"Actors"}>
              {this.state.actors.map((element, i) => {
                return <Actor key={i} actor={element} />;
              })}
            </FourColGrid>
          </div>
        ) : null}
        {!this.state.actors && !this.state.loading ? (
          <h1>No Movie Found!</h1>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
