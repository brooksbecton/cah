export interface ICard {
  playerID: string;
  text: string;
}

export interface BlackCard {
  text: string;
  pick: number;
}
export interface ICtx {
  numPlayers: number;
}
export interface IGame {
  blackCards: BlackCard[];
  cardLimit: number;
  currentBlackCard: BlackCard;
  currentCzarID: number;
  gameStarted: boolean;
  hand: ICard[];
  name: string;
  playedCards: ICard[];
  playerID: number;
  whiteCards: string[];
  winnerCards: ICard[];
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
