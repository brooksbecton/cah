import { Client } from "boardgame.io/react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import DrawCardButton from "./../../components/DrawCardButton";
import HandList from "./../../components/HandList";
import PlayedCardsList from "./../../components/PlayedCardsList";
import Meta from "./../../Context/Meta";
import game from "./../../../game";

class Table extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.ctx.phase === "join phase" && (
          <React.Fragment>
            <button onClick={() => this.props.events.endPhase()}>
              Start Game
            </button>

            <button
              disabled={this.props.G.playersID.includes(+this.props.playerID)}
              onClick={() => {
                this.props.setPlayerID(this.props.G.playersID.length);
                this.props.moves.joinGame();
              }}
            >
              Join game
            </button>
          </React.Fragment>
        )}

        <Meta.Provider
          value={{ playerID: this.props.playerID, gameID: this.props.gameID }}
        >
          <h2>Table!</h2>

          <h3>{this.props.ctx.phase}</h3>
          <DrawCardButton
            onClick={() => this.props.moves.drawCard(this.props.playerID)}
          />

          <h3>Hand {this.props.G.hand.length} cards</h3>
          <HandList
            playCard={cardText => this.props.moves.playCard(cardText)}
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
        </Meta.Provider>
      </React.Fragment>
    );
  }
}

const Cah = Client({
  board: Table,
  // enhancer: applyMiddleware(logger),
  game: game,
  multiplayer: true
});

class TableSeat extends Component {
  state = { playerID: null };

  setPlayerID = id => {
    this.setState({ playerID: String(id) });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Table</h1>
        PlayerID: {this.state.playerID}
        <Cah
          gameID={this.props.match.params.gameID}
          playerID={this.props.match.params.playerID}
          isActive={true}
          setPlayerID={this.setPlayerID}
        />
      </React.Fragment>
    );
  }
}
export default withRouter(TableSeat);
