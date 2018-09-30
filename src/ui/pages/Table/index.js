import { Client } from "boardgame.io/react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";

import filterPlayersCards from "./../../../utils/filterPlayersCards";
import DrawCardButton from "./../../components/DrawCardButton";
import HandList from "./../../components/HandList";
import PlayedCardsList from "./../../components/PlayedCardsList";
import Meta from "./../../Context/Meta";
import game from "./../../../game";

class Table extends Component {
  constructor() {
    super();
  }

  /**
   * Draws a card for a player until they reach their hand limit
   */
  drawHand = (
    cardsNeeded = 10 -
      filterPlayersCards(this.props.G.hand, this.props.playerID)
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
              <DrawCardButton onClick={() => this.drawHand()} />

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

              <h3>Winner Cards</h3>
              <ul>
                {this.props.G.winnerCards.map(card => (
                  <li>
                    {card.playerID}: "{card.text}"
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
``;

export default withRouter(TableSeat);
