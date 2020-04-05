import React, { useState } from "react";

import { Button } from "./../../components/components";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { createGame } from "./utils";

export const Home: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState(2);
  const history = useHistory();

  const handleCreateGame = async () => {
    const newGameId = await createGame(numPlayers);

    history.push(`/join/${newGameId && `${newGameId}/`}`);
  };

  return (
    <Container>
      <h1>Cards Against Humanity</h1>

      <label htmlFor="numPlayers">
        Number of Players
        <input
          id="numPlayers"
          type="number"
          onChange={(e) => {
            setNumPlayers(Number(e.target.value));
          }}
          value={numPlayers}
        />
      </label>
      <br />
      <Button data-test-id="createGameButton" onClick={handleCreateGame}>
        Create Game
      </Button>
      <Button
        data-test-id="NavigateToJoin"
        onClick={() => history.push("/join")}
      >
        Join Game
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
