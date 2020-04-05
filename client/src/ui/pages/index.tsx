import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { Home } from "./Home/Home";
import { Join } from "./Home/Join";
import Table from "./Table";

import { classic } from "./Table/useTheme";

export const BaseRouter = () => {
  return (
    <AppContainer>
      <ThemeProvider theme={classic}>
        <Router basename={process.env.PUBLIC_URL}>
          {/* <Route path="/" exact={true} component={TableTest} /> */}
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/join/:gameId?" component={Join} />
          <Route
            exact={true}
            path="/game/:gameID/:playerCredentials/:playerID"
            component={Table}
          />
        </Router>
      </ThemeProvider>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100%;
`;
