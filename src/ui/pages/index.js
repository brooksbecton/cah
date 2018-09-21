import { Client } from "boardgame.io/react";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import Table from "./Table";
import game from "./../../game";

const Cah = Client({
  board: Table,
  // enhancer: applyMiddleware(logger),
  game: game,
  multiplayer: true
});

const BaseRouter = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route exact path="/game/:gameID" component={Cah} />
      </div>
    </Router>
  );
};

export default BaseRouter;
