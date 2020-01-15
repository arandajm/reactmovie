import React, { Component } from "react";
import Fontawesome from "react-fontawesome";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    value: ""
  };

  timeout = null;

  doSearch = event => {
    // ES6 Destructuring props
    const { callback } = this.props;

    this.setState({
      value: event.target.value
    });

    // Clear Timeout
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // call to callback function every second
      callback(false, this.state.value);
    }, 500);
  };

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <Fontawesome className="rmdb-fa-search" name="search" size="2x" />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search"
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
