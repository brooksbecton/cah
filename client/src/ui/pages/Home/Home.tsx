import React, { useState, useEffect } from "react";
import request from "superagent";

import { Button } from "./../../components/components";
import { IRoom } from "./../../../game/game/types";
import { url } from "./../../../config/url";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { createGame, getGames } from "./utils";


export const Home: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [gameId, setGameId] = useState("");

  const history = useHistory();

  useEffect(() => {
    getGames().then((rooms: IRoom[] = []) => {
      setRooms(rooms);
    });
  }, []);

  const handleCreateGame = async () => {
    const newGameId = await createGame(numPlayers);
    setGameId(newGameId);

    history.push(`/join/${newGameId}/`);
    // getGames();
  };

  return (
    <Container>
      <h1>Cards Against Humanity</h1>

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
      <br />
      <Button data-test-id="createGameButton" onClick={handleCreateGame}>
        Create Game
      </Button>
    </Container>
  );
};
const Container = styled.div`
  background-color: ${({ theme }) => theme.whiteCard.bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-align: center;
`;
