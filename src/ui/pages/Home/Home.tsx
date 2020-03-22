import React, { useState, useEffect, Component } from "react";
import { RouteComponentProps, withRouter, useHistory } from "react-router-dom";
import request from "superagent";

import { url } from "../../../config/url";
import { IRooms } from "../../../types/IRooms";
import { RoomList } from "./RoomList";

/**
 * Creates a new game and returns the new game's id
 */
function createGame(numPlayers: number): Promise<string> {
  return new Promise(async (resolve, reject) => {
    request
      .post(`${url}/games/default/create`)
      .send({
        numPlayers
      })
      .end((err, { body }) => {
        if (err) {
          reject(err);
        } else {
          resolve(body.gameID);
        }
      });
  });
}

function getGames(): Promise<IRooms> {
  return new Promise(async (resolve, reject) => {
    request
      .get(`${url}/games/default`)
      .send()
      .end((error, { body }) => {
        if (error) {
          reject(error);
        } else {
          resolve(body.rooms);
        }
      });
  });
}

/**
 * Adds a player to a game and returns a string
 * that represents their credentials to be in that game room
 */
function joinGame({
  gameId,
  playerId,
  playerName
}: {
  gameId: string;
  playerId: string;
  playerName: string;
}): Promise<string> {
  return new Promise(async (resolve, reject) => {
    request
      .post(`${url}/games/default/${gameId}/join`)
      .send({
        playerID: playerId,
        playerName
      })
      .end((error, { body }) => {
        if (error) {
          reject(error);
        } else {
          resolve(body.playerCredentials);
        }
      });
  });
}

export const Home: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [rooms, setRooms] = useState<IRooms>([]);
  const [gameId, setGameId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const history = useHistory();

  useEffect(() => {
    getGames().then((rooms: IRooms = []) => {
      setRooms(rooms);
    });
  }, []);

  const handleCreateGame = async () => {
    const newGameId = await createGame(numPlayers);
    setGameId(newGameId);

    getGames();
  };

  const handleJoinGame = async () => {
    const playerCredentials = await joinGame({ gameId, playerId, playerName });

    history.push(`/game/${gameId}/${playerCredentials}/${playerId}`);
  };

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
            setNumPlayers(Number(e.target.value));
          }}
          value={numPlayers}
        />
      </label>
      <button data-test-id="createGameButton" onClick={handleCreateGame}>
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
            setGameId(e.target.value);
          }}
          value={gameId}
        />
      </label>
      <label>
        Player ID
        <input
          data-test-id="playerId"
          type="text"
          onChange={e => {
            setPlayerId(e.target.value);
          }}
          value={playerId}
        />
      </label>
      <label>
        Player Name
        <input
          data-test-id="playerName"
          type="text"
          onChange={e => {
            setPlayerName(e.target.value);
          }}
          value={playerName}
        />
      </label>
      <button
        data-test-id="joinGame"
        disabled={!(gameId && playerName)}
        onClick={handleJoinGame}
      >
        Join Game
      </button>
      <div>
        <h3>Rooms</h3>
        <RoomList rooms={rooms} joinGame={handleJoinGame} />
      </div>
    </div>
  );
};
