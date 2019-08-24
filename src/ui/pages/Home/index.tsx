import { parse } from "query-string";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import request from "superagent";

import { url } from "./../../../config/url";
import { IRooms } from "./../../../types/IRooms";
import { RoomList } from "./RoomList";

interface IState {
  gameID: string;
  numPlayers: number;
  playerID: number;
  playerName: string;
  rooms: IRooms;
  playerCredentials: string;
}

class Home extends Component<RouteComponentProps, IState> {
  public state: IState = {
    gameID: "",
    numPlayers: 2,
    playerCredentials: "",
    playerID: 0,
    playerName: "",
    rooms: []
  };

  public componentDidMount() {
    this.getPrePopulatedValues();
    this.getGames();
  }

  public createGame = async (numPlayers = this.state.numPlayers) => {
    await request
      .post(`${url}/games/default/create`)
      .send({
        numPlayers
      })
      .end((err, { body }) => {
        if (!err) {
          this.setState({ gameID: body.gameID });
        } else {
          throw new Error(`Error Creating Game: numPlayers ${numPlayers} `);
        }
      });
    this.getGames();
  };

  public getGames = () => {
    request
      .get(`${url}/games/default`)
      .send()
      .end((err, { body: { rooms } }) => {
        if (!err) {
          this.setState({ rooms });
        } else {
          throw new Error(
            `Error Creating Game: numPlayers ${this.state.numPlayers} `
          );
        }
      });
  };

  public getPrePopulatedValues = () => {
    const { gameID, numPlayers, playerID, playerName }: Partial<IState> = parse(
      location.search
    );

    // Use new values if available otherwise use default state
    const newGameID = gameID ? gameID : this.state.gameID;
    const newNumPlayers = numPlayers ? numPlayers : this.state.numPlayers;
    const newPlayerID = playerID ? playerID : this.state.playerID;
    const newPlayerName = playerName ? playerName : this.state.playerName;

    this.setState({
      gameID: newGameID,
      numPlayers: newNumPlayers,
      playerID: newPlayerID,
      playerName: newPlayerName
    });
  };

  public joinGame = (gameID: string, playerID: number, playerName: string) => {
    const errorJoiningGame = () => {
      throw new Error(
        `Error Joining Game:  gameID: ${gameID}, playerID: ${playerID}, playerName: ${playerName}`
      );
    };

    if (gameID && playerName) {
      request
        .post(`${url}/games/default/${gameID}/join`)
        .send({
          playerID,
          playerName
        })
        .end((err, { body }: { body: Partial<IState> }) => {
          if (!err) {
            const { playerCredentials } = body;
            this.setState({ playerCredentials }, () => {
              this.props.history.push(
                `/game/${gameID}/${playerCredentials}/${playerID}`
              );
            });
          } else {
            errorJoiningGame();
          }
        });
    } else {
      errorJoiningGame();
    }
  };

  public render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Create Game</h2>
        <label htmlFor="numPlayers">
          Number of Players
          <input
            id="numPlayers"
            type="number"
            onChange={e => {
              const numPlayers = Number(e.target.value);
              this.setState({ numPlayers });
            }}
            value={this.state.numPlayers}
          />
        </label>
        <button
          data-test-id="createGameButton"
          onClick={() => this.createGame()}
        >
          Create Game
        </button>
        <h2>Join Game</h2>
        <label>
          Game ID
          <input
            id="gameId"
            data-test-id="gameId"
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
            data-test-id="playerId"
            type="text"
            onChange={e => {
              const playerID = Number(e.target.value);
              this.setState({ playerID });
            }}
            value={this.state.playerID}
          />
        </label>
        <label>
          Player Name
          <input
            data-test-id="playerName"
            type="text"
            onChange={e => {
              const playerName = e.target.value;
              this.setState({ playerName });
            }}
            value={this.state.playerName}
          />
        </label>
        <button
          data-test-id="joinGame"
          disabled={!(this.state.gameID && this.state.playerName)}
          onClick={() =>
            this.joinGame(
              this.state.gameID,
              this.state.playerID,
              this.state.playerName
            )
          }
        >
          Join Game
        </button>
        <div>
          <h3>Rooms</h3>
          <RoomList rooms={this.state.rooms} joinGame={this.joinGame} />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
