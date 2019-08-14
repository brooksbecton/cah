interface IGame {
  cardLimit: number;
  currentBlackCard: string;
  currentCzarID: number;
  name: string;
  playerID: number;
  winnerCards: any[];
  playedCards: any[];
  gameStarted: boolean;
  hand: any[];
  blackCards: { text: string; pick: number };
  whiteCards: string[];
}

function onVoteEnd(G: IGame, ctx: any) {}
