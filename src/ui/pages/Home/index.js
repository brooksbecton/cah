import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import request from "superagent";
import { parse } from "query-string";

class RoomList extends Component {
  static propTypes = {
    rooms: PropTypes.shape({
      gameID: PropTypes.string,
      players: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
      )
    }),
    joinGame: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = { name: "" };
  }

  joinGame = (
    gameID,
    playerName = this.state.name,
    rooms = this.props.rooms
  ) => {
    const room = rooms.filter(({ gID }) => gID !== gameID).pop();
    const openPlayer = room.players.filter(p => p.name === undefined)[0];
    const playerID = openPlayer.id;

    this.props.joinGame(gameID, playerID, playerName);
  };

  render() {
    return (
      <>
        {this.props.rooms.map(room => (
          <li key={room.gameID}>
            <span>{room.gameID}</span>
            <p>Players</p>
            <ul>
              {room.players
                .filter(({ name }) => name !== undefined)
                .map(({ name }) => (
                  <li>{name}</li>
                ))}
              <li>
                <input
                  onChange={e => this.setState({ name: e.target.value })}
                  placeholder="Enter Name"
                />
                <button onClick={() => this.joinGame(room.gameID)}>Join</button>
              </li>
            </ul>
          </li>
        ))}
      </>
    );
  }
}
class Home extends Component {
  static propTypes = {
    history: PropTypes.array
  };

  state = {
    gameID: "",
    numPlayers: 2,
    playerID: 0,
    playerName: "",
    rooms: []
  };

  componentDidMount() {
    this.getPrePopulatedValues();
    this.getGames();
  }

  createGame = async (numPlayers = this.state.numPlayers) => {
    await request
      .post("http://localhost:5556/games/default/create")
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

  getGames = () => {
    request
      .get("http://localhost:5556/games/default")
      .send()
      .end((err, { body: { rooms } }) => {
        if (!err) {
          this.setState({ rooms });
        } else {
          throw new Error(`Error Creating Game: numPlayers ${numPlayers} `);
        }
      });
  };

  getPrePopulatedValues = () => {
    const { gameID, numPlayers, playerID, playerName } = parse(location.search);

    // Use new values if availible otherwise use default state
    const newGameID = gameID ? gameID : this.state.gameID;
    const newNumPlayers = numPlayers ? numPlayers : this.state.numPlayers;
    const newPlayerID = playerID ? playerID : this.state.playerID;
    const newPlayerName = playerName ? playerName : this.state.playerName;

    this.setState(() => {
      return {
        gameID: newGameID,
        numPlayers: newNumPlayers,
        playerID: newPlayerID,
        playerName: newPlayerName
      };
    });
  };

  joinGame = (gameID, playerID, playerName) => {
    const errorJoiningGame = () => {
      throw new Error(
        `Error Joining Game:  gameID: ${gameID}, playerID: ${playerID}, playerName: ${playerName}`
      );
    };

    if (gameID && playerName) {
      request
        .post(`http://localhost:5556/games/default/${gameID}/join`)
        .send({
          playerID: playerID,
          playerName: playerName
        })
        .end((err, { body }) => {
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

  render() {
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
              const playerID = e.target.value;
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
