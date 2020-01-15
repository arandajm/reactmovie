import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Layout/Home/Home";
import Movie from "./components/Movie/Movie";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter basename="/react_rmdb/">
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:movieId" component={Movie} exact />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
