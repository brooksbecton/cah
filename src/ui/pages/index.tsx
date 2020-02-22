import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Home from "./Home";
// @ts-ignore
import Table from "./Table";

const BaseRouter = () => {
  return (
    <Router>
      <div>
        <Route exact={true} path="/" component={Home} />
        <Route
          exact={true}
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
