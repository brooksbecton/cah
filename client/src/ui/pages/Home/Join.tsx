import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import { Input, Button } from "./../../components/components";
import { getGames, joinGame } from "./utils";

export const Join: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch<{ gameId: string }>();

  const [gameId, setGameId] = useState(match.params.gameId);
  const [playerName, setPlayerName] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (isJoining === true) {
      getGames().then((newGames) => {
        const usersGame = newGames.find((g) => g.gameID === gameId);
        const openSeat = usersGame?.players.find(
          (seat) => seat.name === undefined
        );

        if (openSeat) {
          joinGame({
            gameId,
            playerId: String(openSeat.id),
            playerName,
          }).then((playerCredentials) => {
            history.push(`/game/${gameId}/${playerCredentials}/${openSeat.id}`);
            setIsJoining(false);
          });
        } else {
          // No Open Seats
          setIsJoining(false);
        }
      });
    }
  }, [isJoining, gameId, history, playerName]);

  const handleJoinGame = () => {
    setIsJoining(true);
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
          onChange={(e) => {
            setGameId(e.target.value);
          }}
          value={gameId}
        />
      </label>
      <br />
      <label>
        Player Name
        <Input
          placeholder="Player Name"
          data-test-id="playerName"
          type="text"
          onChange={(e) => {
            setPlayerName(e.target.value);
          }}
          value={playerName}
        />
      </label>
      <br />
      <Button
        data-test-id="joinGame"
        disabled={!(gameId && playerName)}
        onClick={handleJoinGame}
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
