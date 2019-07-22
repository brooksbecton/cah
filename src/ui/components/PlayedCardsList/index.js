import React, { Component } from "react";
import PropTypes from "prop-types";
import Meta from "./../../Context/Meta";
class PlayedCardsList extends Component {

  static propTypes = {
    playedCards: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        playerID: PropTypes.string
      })
    ),
    voteCard: PropTypes.func.isRequired
  };

  render() {
    return (
      <Meta.Consumer>
        {({ G, ctx, playerID }) => (
          <ul>
            {this.props.playedCards.map(card => (
              <li key={card.text}>
                {card.text}
                playerID {card.playerID}
                <button
                  disabled={
                    ctx.phase !== "vote" || Number(playerID) !== Number(G.currentCzarID)
                  }
                  onClick={() => this.props.voteCard(card)}
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
        )}
      </Meta.Consumer>
    );
  }
}

export default PlayedCardsList;
