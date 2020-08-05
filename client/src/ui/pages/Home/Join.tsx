import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import { Input, Button } from "./../../components/components";
import { getGames, joinGame } from "./utils";
import styled from "styled-components";

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
    <Container>
      <Title>Join Game</Title>
      <InputContainer>
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
        <Input
          placeholder="Player Name"
          data-test-id="playerName"
          type="text"
          onChange={(e) => {
            setPlayerName(e.target.value);
          }}
          value={playerName}
        />
        <Button
          isLoading={isJoining}
          data-test-id="joinGame"
          disabled={!(gameId && playerName)}
          onClick={handleJoinGame}
        >
          Join Game
        </Button>
      </InputContainer>
      {/* <div>
        <h3>Rooms</h3>
        <RoomList rooms={rooms} joinGame={handleJoinGame} />
      </div> */}
    </Container>
  );
};

const Title = styled.h1`
  flex: 3;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.whiteCard.bg};
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  text-align: center;
  padding: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  * {
    margin-bottom: ${({ theme }) => theme.space.vertical};
  }
`;
