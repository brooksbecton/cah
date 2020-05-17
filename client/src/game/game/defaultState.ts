import { cards } from "../constants/cards";
import { IGame } from "./types";

export const defaultState: IGame = {
  isShowcasing: false,
  blackCards: cards.blackCards,
  cardLimit: 10,
  currentBlackCard: { pick: 0, text: "" },
  currentCzarID: 0,
  gameStarted: false,
  hand: [],
  name: "cah",
  playedCards: [],
  playerID: null,
  whiteCards: cards.whiteCards,
  winnerCards: [],
  gameOver: false,
  winningCardAmount: 10,
};
