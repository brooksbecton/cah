import { Client } from "boardgame.io/react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import filterPlayersCards from "./../../../utils/filterPlayersCards";
import DrawCardButton from "./../../components/DrawCardButton";
import { HandList } from "./HandList";
import PlayedCardsList from "./../../components/PlayedCardsList";
import Meta from "./../../Context/Meta";
import game from "./../../../game";
import { BlackCardArea } from "./BlackCardArea";

class Table extends Component {
  constructor(props) {
    super();

    this.state = {
      whiteCards: props.G.hand
    };
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "white-card-area") {
      const whiteCards = this.reorder(
        this.state.whiteCards,
        result.source.index,
        result.destination.index
      );

      this.setState({
        whiteCards
      });
    }

    if (result.destination.droppableId === "black-card-area") {
      const playedCard = this.state.whiteCards[result.source.index];

      this.props.moves.playCard(playedCard, this.props.playerID);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.G.hand.length !== this.props.G.hand.length) {
      this.setState({
        whiteCards: this.props.G.hand.filter(
          ({ playerID }) => playerID === this.props.playerID
        )
      });
    }
  }

  /**
   * Draws a card for a player until they reach their hand limit
   */

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
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
              {this.props.ctx.phase}

              <BlackCardArea text={this.props.G.currentBlackCard.text} />

              <Droppable droppableId="white-card-area">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
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
                          this.props.moves.playCard(
                            cardText,
                            this.props.playerID
                          )
                        }
                        cardList={this.state.whiteCards}
                        playerID={this.props.playerID}
                      />
                      {/*
       
                <h3>Winner Cards</h3>
                <ul>
                  {this.props.G.winnerCards.map(card => (
                    <li key={card.text}>
                      {card.playerID}: {card.text}
                    </li>
                  ))}
                </ul> */}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
              <h3>Played Cards</h3>
              <PlayedCardsList
                playedCards={this.props.G.playedCards}
                voteCard={card => this.props.moves.voteCard(card)}
              />
            </div>
          )}
        </Meta.Provider>
      </DragDropContext>
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
export default withRouter(TableSeat);
