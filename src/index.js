import React from "react";
import ReactDOM from "react-dom";
import BaseRouter from './ui/pages/'
import "@babel/polyfill";



/* eslint immutable/no-mutation: 0 */

document.onload = (function() {
  ReactDOM.render(
    <BaseRouter />,
    document.getElementById("root")
  );
})();
