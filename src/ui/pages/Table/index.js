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
        <Meta.Provider
          value={{
            G: this.props.G,
            ctx: this.props.ctx,
            playerID: this.props.playerID,
            gameID: this.props.gameID
          }}
        >
          <h2>Table!</h2>

          <h3>{this.props.ctx.phase}</h3>
          <DrawCardButton
            onClick={() => this.props.moves.drawCard(this.props.playerID)}
          />

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

class TableSeat extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return (
  //     nextProps.gameID !== this.props.gameID ||
  //     nextProps.numPlayers !== this.props.numPlayers
  //   );
  // }

  render() {
    const Cah = Client({
      board: Table,
      // enhancer: applyMiddleware(logger),
      game: game,
      numPlayers: this.props.match.params.numPlayers,
      multiplayer: { server: "http://localhost:5555" }
    });

    return (
      <Cah
        gameID={this.props.match.params.gameID}
        playerID={this.props.match.params.playerID}
      />
    );
  }
}
``;

export default withRouter(TableSeat);
