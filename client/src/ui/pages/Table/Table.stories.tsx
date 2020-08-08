import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeDecorator } from "../../../../.storybook/themeWrapper";
import { defaultState } from "../../../game/game/defaultState";
import { Table as TableComponent, IProps } from "./Table";
import { cards } from "./../../../game/constants/cards";
import { ICard } from "./../../../game/game/types";

addDecorator(ThemeDecorator);

export default {
  title: "Table",
  component: TableComponent,
};

const getWhiteCardHand = (): ICard[] => {
  return cards.whiteCards.slice(0, 10).map((card) => {
    return {
      playerID: "0",
      text: card,
    };
  });
};

const setupProps: IProps = {
  G: {
    ...defaultState,
    gameStarted: true,
    hand: getWhiteCardHand(),
    currentCzarID: 1,
    currentBlackCard: cards.blackCards[34],
  },
  ctx: { phase: "play", numPlayers: 2 },
  gameMetadata: {
    0: { name: "Hope", id: 0 },
    1: { name: "Brooks", id: 1 },
  },
  playerID: "0",
  gameID: "1",
  moves: null,
};

export const NoCardsPlayed = () => {
  return <TableComponent {...setupProps} />;
};
export const OnePlayedCards = () => {
  return (
    <TableComponent
      {...setupProps}
      G={{
        ...setupProps.G,
        playedCards: [
          {
            playerID: "0",
            text: cards.whiteCards[6],
          },
        ],
      }}
    />
  );
};
export const WinnerCard = () => {
  return (
    <TableComponent
      {...setupProps}
      G={{
        ...setupProps.G,
        playedCards: [
          {
            playerID: "0",
            text: cards.whiteCards[6],
          },
        ],
        winnerCards: [{ playerID: "0", text: cards.whiteCards[6] }],
      }}
      ctx={{ ...setupProps.ctx, phase: "showcase" }}
    />
  );
};
