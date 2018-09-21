import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import BaseRouter from './ui/pages/'


/* eslint immutable/no-mutation: 0 */

document.onload = (function() {
  ReactDOM.render(
    <BaseRouter />,
    document.getElementById("root")
  );
})();
