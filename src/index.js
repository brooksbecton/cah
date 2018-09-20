import { Client } from "boardgame.io/react";
import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import game from "./game/index";
import uuid from "uuid/v1";
import Table from "./ui/index";

const App = Client({
  board: Table,
  // enhancer: applyMiddleware(logger),
  game: game,
  multiplayer: true
});

/* eslint immutable/no-mutation: 0 */

document.onload = (function() {
  ReactDOM.render(
    <App gameID="1234123" playerID={uuid()} />,
    document.getElementById("root")
  );
})();
