import React, { Component } from "react";
import PropTypes from "prop-types";

class PlayedCardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ul>
        {this.props.playedCards.map((card) => (
          <li key={card.text}>
            {card.text}
            <button onClick={() => this.props.voteCard(card)}>Vote</button>
          </li>
        ))}
      </ul>
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
