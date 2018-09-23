import React from "react";
import Proptypes from "prop-types";

import Meta from "./../../Context/Meta";
import filterPlayersCards from "./../../../utils/filterPlayersCards";
const DrawCardButton = ({ onClick }) => {
  return (
    <Meta.Consumer>
      {({ G, ctx, playerID }) => {
        return (
          <button
            disabled={
              ctx.phase !== "draw phase" ||
              filterPlayersCards(G.hand, playerID).length >= 10
            }
            onClick={onClick}
          >
            Draw Card
          </button>
        );
      }}
    </Meta.Consumer>
  );
};

DrawCardButton.proptypes = {
  onClick: Proptypes.func
};

export default DrawCardButton;
