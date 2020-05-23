import React from "react";
import * as Sentry from '@sentry/browser';

import { BaseRouter } from "./ui/pages";
import "./App.css";

Sentry.init({
  dsn:
    "https://9461a3e2e08d4c95a0bb18665b905122@o397091.ingest.sentry.io/5251273",
});

function App() {
  return <BaseRouter />;
}

export default App;
