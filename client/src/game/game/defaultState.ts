import { cards } from "../constants/cards";
import { IGame } from "./types";

export const defaultState: IGame = {
  isShowcasing: false,
  /**
   * @TODO
   * I think all the logic works with picks > 1, but I need to 
   * think about the UX around picking cards from the czar point of view. 
   * 
   * And how showcasing would work
   */
  blackCards: cards.blackCards.filter((card) => card.pick === 1),
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
