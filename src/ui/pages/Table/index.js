import { Client } from "boardgame.io/react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import filterPlayersCards from "./../../../utils/filterPlayersCards";
import DrawCardButton from "./../../components/DrawCardButton";
import { HandList } from "./HandList";
import PlayedCardsList from "./../../components/PlayedCardsList";
import Meta from "./../../Context/Meta";
import game from "./../../../game";
import { BlackCardArea } from "./BlackCardArea";

class Table extends Component {
  static propTypes = {
    moves: PropTypes.object,
    G: PropTypes.object,
    playerID: PropTypes.string,
    ctx: PropTypes.object,
    gameID: PropTypes.string
  };

  /**
   * Draws a card for a player until they reach their hand limit
   */

  render() {
    return (
      <>
        <Meta.Provider
          value={{
            G: this.props.G,
            ctx: this.props.ctx,
            playerID: this.props.playerID,
            gameID: this.props.gameID
          }}
        >
          {this.props.G.gameStarted === false || false ? (
            <>
              <button
                data-test-id="join-game-button"
                onClick={() => this.props.moves.joinGame(this.props.playerID)}
              >
                Join Game
              </button>

              <button
                data-test-id="start-game-button"
                onClick={() => this.props.moves.startGame()}
              >
                Start Game
              </button>
            </>
          ) : (
            <div style={{ maxWidth: 400 }}>
              <DrawCardButton
                onClick={() => this.props.moves.drawCard(this.props.playerID)}
              />
              <BlackCardArea text={this.props.G.currentBlackCard.text} />
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  width: "100%",
                  height: "100%",
                  padding: 10
                }}
              >
                <h2 style={{ fontSize: 14 }}>Your Cards</h2>
                <HandList
                  playCard={cardText =>
                    this.props.moves.playCard(cardText, this.props.playerID)
                  }
                  cardList={this.props.G.hand}
                  playerID={this.props.playerID}
                />

                {/* <h3>Played Cards</h3>
                <PlayedCardsList
                  playedCards={this.props.G.playedCards}
                  voteCard={card => this.props.moves.voteCard(card)}
                />

                <h3>Winner Cards</h3>
                <ul>
                  {this.props.G.winnerCards.map(card => (
                    <li key={card.textr}>
                      {card.playerID}: {card.text}
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
          )}
        </Meta.Provider>
      </>
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
