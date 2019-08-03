import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import Table from "./Table";

const BaseRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/game/:gameID/:playerCredentials/:playerID"
          component={Table}
        />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    </Router>
  );
};

export default BaseRouter;
