import React, { Component } from "react";
import PropTypes from "prop-types";
import Meta from "./../../Context/Meta";

class HandList extends Component {
  static defaultProps = {
    cardList: []
  };

  static propTypes = {
    cardList: PropTypes.arrayOf(PropTypes.string),
    playCard: PropTypes.func
  };

  hasPlayedCard = ({ playerID = "", playedCards = [] }) => {
    return !playedCards
      .map(({ playerID }) => playerID)
      .every(cardOwnerID => cardOwnerID !== playerID);
  };

  render() {
    return (
      <Meta.Consumer>
        {({ G, ctx, playerID }) => (
          <ol>
            {this.props.cardList
              .filter(({ playerID: ownerID }) => ownerID === playerID)
              .map(card => {
                return (
                  <li key={card.text}>
                    {card.text}
                    <button
                      disabled={
                        ctx.phase !== "play" ||
                        Number(playerID) === Number(G.currentCzarID) ||
                        this.hasPlayedCard({
                          playerID,
                          playedCards: G.playedCards
                        })
                      }
                      onClick={() => this.props.playCard(card)}
                    >
                      Play Card
                    </button>
                  </li>
                );
              })}
          </ol>
        )}
      </Meta.Consumer>
    );
  }
}

export default HandList;
