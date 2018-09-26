import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import request from "superagent";
class Home extends Component {
  state = {
    gameID: "",
    numPlayers: 2,
    playerID: 0,
    playerName: ""
  };
  constructor(props) {
    super(props);
  }

  createGame = (numPlayers = this.state.numPlayers) => {
    request
      .post("http://localhost:5556/games/default/create")
      .send({
        numPlayers: this.state.numPlayers
      })
      .end((err, { body }) => {
        if (!err) {
          this.setState({ gameID: body.gameID });
        } else {
          console.error(
            `Error Creating Game: numPlayers ${this.state.numPlayers} `
          );
        }
      });
  };

  joinGame = () => {
    const errorJoiningGame = () =>
      console.error(
        `Error Joining Game:  gameID: ${this.state.gameID}, playerID: ${
          this.state.playerID
        }, playerName: ${this.state.playerName}`
      );

    if (this.state.gameID && this.state.playerName) {
      request
        .post(`http://localhost:5556/games/default/${this.state.gameID}/join`)
        .send({
          playerID: this.state.playerID,
          playerName: this.state.playerName
        })
        .end((err, { body }) => {
          if (!err) {
            const { playerCredentials } = body;
            this.setState({ playerCredentials }, () => {
              this.props.history.push(
                `/game/${this.state.gameID}/${this.state.playerCredentials}/${
                  this.state.playerID
                }`
              );
            });
          } else {
            errorJoiningGame()
          }
        });
    } else {
      errorJoiningGame()
    }
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Create Game</h2>
        <label>
          Number of Players
          <input
            type="text"
            onChange={e => {
              const numPlayers = Number(e.target.value);
              if (numPlayers > 0 && numPlayers < 20) {
                this.setState({ numPlayers: e.target.value });
              }
            }}
            value={this.state.numPlayers}
          />
        </label>
        <button onClick={() => this.createGame()}>Create Game</button>
        <h2>Join Game</h2>
        <label>
          Game ID
          <input
            type="text"
            onChange={e => {
              this.setState({ gameID: e.target.value });
            }}
            value={this.state.gameID}
          />
        </label>
        <label>
          Player ID
          <input
            type="text"
            onChange={e => {
              const playerID = e.target.value;
              this.setState({ playerID });
            }}
            value={this.state.playerID}
          />
        </label>
        <label>
          Player Name
          <input
            type="text"
            onChange={e => {
              const playerName = e.target.value;
              this.setState({ playerName });
            }}
          />
        </label>
        <button
          disabled={!(this.state.gameID && this.state.playerName)}
          onClick={() => this.joinGame()}
        >
          Join Game
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
