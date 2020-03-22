import { Client } from "boardgame.io/react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "react-toastify/dist/ReactToastify.css";

import filterPlayersCards from "./../../../utils/filterPlayersCards";
import DrawCardButton from "./../../components/DrawCardButton";
import { HandList } from "./HandList";
import PlayedCardsList from "./../../components/PlayedCardsList";
import Meta from "./../../Context/Meta";
import game from "./../../../game";
import { WhiteCard } from "./WhiteCard";
import { PhaseToast } from "./PhaseToast";

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

  render() {
    const filteredPlayedCards =
      // If the current player is the Czar then just hand back all the hards for voting
      Number(this.props.playerID) === this.props.G.currentCzarID
        ? this.props.G.playedCards
        : // Non-Czar players only get their cards
          this.props.G.playedCards.filter(
            card => Number(card.playerID) === Number(this.props.playerID)
          );

    return (
      <>
        <PhaseToast phase={this.props.ctx.phase} />
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
              <div
                style={{
                  maxWidth: 375,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <DrawCardButton
                  onClick={() => this.props.moves.drawCard(this.props.playerID)}
                />

                <Droppable droppableId="black-card-area">
                  {provided => (
                    <div {...provided.droppableProps}>
                      <div
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          minHeight: 95,
                          padding: 11
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            marginBottom: 10,
                            fontWeight: "bold"
                          }}
                        >
                          {this.props.G.currentBlackCard.text}
                        </p>

                        <ul
                          style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0
                          }}
                        >
                          {filteredPlayedCards.map(card => (
                            <li
                              ref={provided.innerRef}
                              key={card.text}
                              onClick={e =>
                                Number(this.props.playerID) ===
                                this.props.G.currentCzarID
                                  ? this.props.moves.voteCard(card)
                                  : null
                              }
                            >
                              <WhiteCard text={card.text} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <Droppable droppableId="white-card-area">
                  {provided => (
                    <div {...provided.droppableProps}>
                      <div
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: "#F4F4F4",
                          padding: 10
                        }}
                      >
                        <h2 style={{ fontSize: 14 }}>Your Cards</h2>
                        <HandList
                          G={this.props.G}
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
              </div>
            )}
          </Meta.Provider>
        </DragDropContext>
      </>
    );
  }
}

class TableSeat extends Component {
  render() {
    const Cah = Client({
      board: Table,
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
