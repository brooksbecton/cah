import { Client } from "boardgame.io/react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import filterPlayersCards from "./../../../utils/filterPlayersCards";
import DrawCardButton from "./../../components/DrawCardButton";
import HandList from "./../../components/HandList";
import PlayedCardsList from "./../../components/PlayedCardsList";
import Meta from "./../../Context/Meta";
import game from "./../../../game";

class Table extends Component {
  static propTypes = {
    moves: PropTypes.object,
    G: PropTypes.object,
    playerID: PropTypes.string,
    ctx: PropTypes.object,
    gameID: PropTypes.string
  };

  constructor() {
    super();
  }

  /**
   * Draws a card for a player until they reach their hand limit
   */
  drawHand = (
    cardsNeeded = 10 -
      filterPlayersCards(this.props.G.hand, this.props.playerID).length
  ) => {
    if (cardsNeeded !== 0) {
      this.props.moves.drawCard(this.props.playerID);
      this.drawHand(cardsNeeded - 1);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Meta.Provider
          value={{
            G: this.props.G,
            ctx: this.props.ctx,
            playerID: this.props.playerID,
            gameID: this.props.gameID
          }}
        >
          <h2>Table!</h2>
          {this.props.G.gameStarted === false ? (
            <React.Fragment>
              <button
                onClick={() => this.props.moves.joinGame(this.props.playerID)}
              >
                Join Game
              </button>
              <button onClick={() => this.props.moves.startGame()}>
                Start Game
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h3>{this.props.ctx.phase}</h3>
              <DrawCardButton
                onClick={() => this.props.moves.drawCard(this.props.playerID)}
              />

              <HandList
                playCard={cardText =>
                  this.props.moves.playCard(cardText, this.props.playerID)
                }
                cardList={this.props.G.hand}
              />

              <h3>Played Cards</h3>
              <PlayedCardsList
                playedCards={this.props.G.playedCards}
                voteCard={card => this.props.moves.voteCard(card)}
              />

              <h3>Black Card</h3>
              <p>{this.props.G.currentBlackCard.text}</p>

              <h3>Winner Cards</h3>
              <ul>
                {this.props.G.winnerCards.map(card => (
                  <li key={card.textr}>
                    {card.playerID}: {card.text}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}
        </Meta.Provider>
      </React.Fragment>
    );
  }
}

class TableSeat extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        gameID: PropTypes.string,
        playerCredentials: PropTypes.string,
        playerID: PropTypes.string
      })
    })
  };

  render() {
    const Cah = Client({
      board: Table,
      // enhancer: applyMiddleware(logger),
      game: game,
      multiplayer: { server: "http://localhost:5555" }
    });

    return (
      <Cah
        gameID={this.props.match.params.gameID}
        credentials={this.props.match.params.playerCredentials}
        playerID={this.props.match.params.playerID}
      />
    );
  }
}
export default withRouter(TableSeat);
