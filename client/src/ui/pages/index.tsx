import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { Home } from "./Home/Home";
import { Join } from "./Home/Join";
import Table from "./Table";

import { classic } from "./Table/useTheme";

export const BaseRouter = () => {
  return (
    <ThemeProvider theme={classic}>
      <AppContainer>
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/join/:gameId?" component={Join} />
          <Route
            exact={true}
            path="/game/:gameID/:playerCredentials/:playerID"
            component={Table}
          />
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  height: 100%;
`;
