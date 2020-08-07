import * as React from "react";
import styled from "styled-components";
import { IGame, ICtx } from "./../../../game/game/types";

interface IProps {
  G: IGame;
  phase: ICtx["phase"];
  winnerCards: IGame["winnerCards"];
  gameMetadata: {
    [playerID: string]: {
      id: number;
      name: string;
    };
  };
}

export const InfoBar: React.FC<IProps> = ({
  G,
  phase,
  winnerCards,
  gameMetadata = {},
}) => {
  const getPhase = ({
    phase,
    isCzar,
  }: {
    phase: ICtx["phase"];
    isCzar: boolean;
  }) => {
    switch (phase) {
      case "play":
        return isCzar ? "Waiting for players" : phase;
      case "vote":
        return isCzar ? phase : "Waiting for Czar";
      default:
        return phase;
    }
  };

  return (
    <Container>
      <PlayersList data-test-id="player-score">
        {Object.keys(gameMetadata)
          .map((playerId) => {
            const winningCardCount = winnerCards.filter(
              (card) => card.playerID === playerId
            ).length;

            return { ...gameMetadata[playerId], score: winningCardCount };
          })
          .map((player) => {
            return (
              <li key={player.id}>
                {player.id === G.currentCzarID && "(Czar)"} {player.name} :
                {player.score}
              </li>
            );
          })}
      </PlayersList>
      <p data-test-id="phase">
        {getPhase({
          phase,
          isCzar: G.playerID === G.currentCzarID,
        })?.toUpperCase()}
      </p>
    </Container>
  );
};

const Container = styled.aside`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  width: 30px;
  height: calc(100% - 60px);
  align-items: center;

  background-color: ${({ theme }) => theme.colors.white};
  padding: 5px;
  padding-bottom: 30px;
  padding-top: 30px;
  p {
    margin: 0;
    writing-mode: vertical-rl;
  }
`;

const PlayersList = styled.ul`
  padding: 0;
  margin: 0;

  li {
    writing-mode: vertical-rl;
    list-style: none;

    margin-bottom: 25px;
    font-weight: lighter;
  }
`;
