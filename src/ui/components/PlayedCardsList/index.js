import React, { Component } from "react";
import PropTypes from "prop-types";
import Meta from "./../../Context/Meta";
class PlayedCardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Meta.Consumer>
        {({ ctx }) => (
          <ul>
            {this.props.playedCards.map(card => (
              <li key={card.text}>
                {card.text}
                <button
                  disabled={ctx.phase !== "vote phase"}
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

PlayedCardsList.propTypes = {
  playedCards: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      playerID: PropTypes.string
    })
  ),
  voteCard: PropTypes.func.isRequired
};

export default PlayedCardsList;
