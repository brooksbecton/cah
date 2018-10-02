import React, { Component } from "react";
import Proptypes from "prop-types";

import Meta from "./../../Context/Meta";
import filterPlayersCards from "./../../../utils/filterPlayersCards";

class DrawCardButton extends Component {
  static propTypes = {
    onClick: Proptypes.func
  };

  render() {
    return (
      <Meta.Consumer>
        {({ G, ctx, playerID }) => {
          return (
            <button
              disabled={
                ctx.phase !== "draw phase" ||
                filterPlayersCards(G.hand, playerID).length >= 10
              }
              onClick={this.props.onClick}
            >
              Draw Card
            </button>
          );
        }}
      </Meta.Consumer>
    );
  }
}

export default DrawCardButton;
