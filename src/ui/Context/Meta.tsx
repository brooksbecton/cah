import React from "react";
import { ICtx, IGame, ICard, BlackCard } from "./../../game/types";

interface Game {
  hand: ICard[];
  currentCzarID: string;
  currentBlackCard: BlackCard;
  playedCards: Array<{ playerID: string; text: string }>;
}


/**
 * Holds meta information about the current game
 *
 * playerID
 * gameID
 */
export const Meta = React.createContext<
  Partial<{
    G: IGame;
    ctx: ICtx;
    playerId: string;
    gameId: string;
  }>
>({});
