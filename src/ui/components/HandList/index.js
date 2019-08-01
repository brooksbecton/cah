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

  playedCardsCount = ({ playerID = "", playedCards = [] }) => {
    const playersCardCount = playedCards
      .map(({ playerID }) => playerID)
      .filter(cardOwnerID => cardOwnerID !== playerID).length;
    return playersCardCount;
  };

  render() {
    return (
      <Meta.Consumer>
        {({ G, ctx, playerID }) => (
          <ol data-test-id="players-hand">
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
                        this.playedCardsCount({
                          playerID,
                          playedCards: G.playedCards
                        }) === G.currentBlackCard.pick
                      }
                      data-test-id="play-card-button"
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
