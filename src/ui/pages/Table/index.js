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
          value={{ playerID: this.props.playerID, gameID: this.props.gameID }}
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

  componentDidMount() {
    fetch(
      `http://localhost:5556/games/default/${
        this.props.match.params.gameID
      }/join`,
      {
        method: "POST",
        body: JSON.stringify({
          playerID: this.props.match.params.playerID,
          playerName: "DSF"
        })
      }
    )
      .then(resp => resp.json())
      .then(({ credentials }) => {
        this.setState({ credentials });
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Table</h1>
        PlayerID: {this.state.playerID}
        <Cah
          gameID={this.props.match.params.gameID}
          playerID={this.props.match.params.playerID}
          credentials={this.state.credentials}
          setPlayerID={this.setPlayerID}
        />
      </React.Fragment>
    );
  }
}
export default withRouter(TableSeat);
