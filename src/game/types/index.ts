export interface IGame {
  cardLimit: number;
  currentBlackCard: string;
  currentCzarID: number;
  name: string;
  playerID: number;
  winnerCards: any[];
  playedCards: any[];
  gameStarted: boolean;
  hand: Array<{ text: string; playerID: string }>;
  blackCards: Array<{ text: string; pick: number }>;
  whiteCards: string[];
}

export interface ICards {
  blackCards: IGame["blackCards"];
  whiteCards: IGame["whiteCards"];
  Base: {
    name: string;
    black: number[];
    white: number[];
  };
  order: string[];
}

export interface IBlackCard {
  text: string;
  pick: number;
}

export type IWhiteCard = string;
