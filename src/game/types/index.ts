export interface ICard {
  playerID: string;
  text: string;
}

export interface BlackCard {
  text: string;
  pick: number;
}

export interface IGame {
  cardLimit: number;
  currentBlackCard: BlackCard;
  currentCzarID: number;
  name: string;
  playerID: number;
  winnerCards: any[];
  playedCards: any[];
  gameStarted: boolean;
  hand: ICard[];
  blackCards: BlackCard[];
  whiteCards: string[];
}

export interface ICtx {
  phase: "setup" | "draw" | "play" | "vote";
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
