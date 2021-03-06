import React, { useState } from "react";

import { Button, Input } from "./../../components/components";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { createGame } from "./utils";

export const Home: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [isCreating, setIsCreating] = useState(false);
  const history = useHistory();

  const handleCreateGame = async () => {
    setIsCreating(true);
    const newGameId = await createGame(numPlayers);

    history.push(`/join/${newGameId && `${newGameId}/`}`);
  };

  return (
    <Container>
      <Title>Cards Against Humanity</Title>

      <InputContainer>
        <Input
          id="numPlayers"
          type="number"
          placeholder="Number of Players"
          onChange={(e) => {
            setNumPlayers(Number(e.target.value));
          }}
          value={numPlayers}
        />
        <Button
          isLoading={isCreating}
          data-test-id="createGameButton"
          onClick={handleCreateGame}
        >
          Create Game
        </Button>
        <Button
          data-test-id="NavigateToJoin"
          onClick={() => history.push("/join")}
        >
          Join Game
        </Button>
      </InputContainer>
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
