import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import { Input, Button } from "./../../components/components";
import { getGames, joinGame } from "./utils";
import { IRoom } from "../../../game/game/types";

export const Join: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch<{ gameId: string }>();

  const [gameId, setGameId] = useState(match.params.gameId);
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [game, setGame] = useState<IRoom>();

  useEffect(() => {
    getGames().then(newGames => {
      const [usersGame] = newGames.filter(g => g.gameID === gameId);
      setGame(usersGame);
    });
  }, []);

  const handleJoinGame = async (gId: string, pId: number, pName: string) => {
    const playerCredentials = await joinGame({
      gameId: gId,
      playerId: String(pId),
      playerName: pName
    });

    history.push(`/game/${gameId}/${playerCredentials}/${playerId}`);
  };

  return (
    <>
      <h2>Join Game</h2>
      <label>
        Game ID
        <Input
          placeholder="Game ID"
          id="gameId"
          data-test-id="gameId"
          type="text"
          onChange={e => {
            setGameId(e.target.value);
          }}
          value={gameId}
        />
      </label>
      <br />
      <label>
        Player ID
        <Input
          placeholder="Player ID"
          data-test-id="playerId"
          type="text"
          onChange={e => {
            setPlayerId(e.target.value);
          }}
          value={playerId}
        />
      </label>
      <br />
      <label>
        Player Name
        <Input
          placeholder="Player Name"
          data-test-id="playerName"
          type="text"
          onChange={e => {
            setPlayerName(e.target.value);
          }}
          value={playerName}
        />
      </label>
      <br />
      <Button
        data-test-id="joinGame"
        disabled={!(gameId && playerName)}
        onClick={() => handleJoinGame(gameId, Number(playerId), playerName)}
      >
        Join Game
      </Button>
      {/* <div>
        <h3>Rooms</h3>
        <RoomList rooms={rooms} joinGame={handleJoinGame} />
      </div> */}
    </>
  );
};
