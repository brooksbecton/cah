import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Home } from "./Home/Home";
import Table from "./Table";

import { classic } from "./Table/useTheme";

// const TableTest = () => {
//   const whiteCards = cards.whiteCards.slice(0, 10);

//   return (
//     <ThemeProvider theme={classic}>
//       <TableContainer>
//         <BlackCardList>
//           <ListHeader>{cards.blackCards[8].text}</ListHeader>
//         </BlackCardList>
//         <WhiteCardList>
//           <ListHeader>Your Cards: </ListHeader>
//           {whiteCards.map(cardText => (
//             <WhiteCard key={cardText} text={cardText} />
//           ))}
//         </WhiteCardList>
//       </TableContainer>
//     </ThemeProvider>
//   );
// };

export const BaseRouter = () => {
  return (
    <ThemeProvider theme={classic}>
      <Router>
        {/* <Route path="/" exact={true} component={TableTest} /> */}
        <Route exact={true} path="/" component={Home} />
        <Route
          exact={true}
          path="/game/:gameID/:playerCredentials/:playerID"
          component={Table}
        />
      </Router>
    </ThemeProvider>
  );
};
