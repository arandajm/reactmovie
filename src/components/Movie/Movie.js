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
    this.setState({ loading: true });
    // Build movie url
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en_US`;
    // Fetch the movie...
    this.fetchItems(endpoint);
  }

  fetchItems = endpoint => {
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
              const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
              //Fetch actors in the state
              fetch(endpoint)
                .then(result => result.json())
                .then(result => {
                  const directors = result.crew.filter(
                    member => member.job === "Director"
                  );
                  // Set actors and directors in the state
                  this.setState({
                    actors: result.cast,
                    directors: directors,
                    loading: false
                  });
                })
                .catch(err => console.log(err));
            }
          );
        }
      });
  };

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
