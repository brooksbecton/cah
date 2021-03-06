export interface ICard {
  playerID: string;
  text: string;
}

export type IRoom = {
  gameID: string;
  players: Array<{ name: string; id: number }>;
};

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
  isShowcasing: boolean;
  name: string;
  playedCards: ICard[];
  playerID: number | null;
  whiteCards: string[];
  winnerCards: ICard[];
  winningCardAmount: number;
  gameOver: boolean;
}

export interface ICtx {
  phase: "setup" | "draw" | "play" | "vote" | "showcase";
}

export interface ICards {
  blackCards: IGame["blackCards"];
  whiteCards: IGame["whiteCards"];
}

export interface IBlackCard {
  text: string;
  pick: number;
}

export type IWhiteCard = string;
