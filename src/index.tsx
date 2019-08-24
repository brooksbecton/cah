import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";

import BaseRouter from "./ui/pages";

/* eslint immutable/no-mutation: 0 */
document.onload = () =>
  ReactDOM.render(<BaseRouter />, document.getElementById("root"));
