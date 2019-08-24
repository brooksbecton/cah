import { cards } from "./../constants/cards";
import { IGame } from "./types";

export const defaultState: IGame = {
  blackCards: cards.blackCards,
  cardLimit: 10,
  currentBlackCard: "",
  currentCzarID: 0,
  gameStarted: false,
  hand: [],
  name: "cah",
  playedCards: [],
  playerID: null,
  whiteCards: cards.whiteCards,
  winnerCards: [],
};