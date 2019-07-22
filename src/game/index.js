import { Game, TurnOrder } from "boardgame.io/core";

import { cards } from "./../constants/cards";
import drawCard from "./../utils/drawCard";
import filterPlayerCards from "./../utils/filterPlayersCards";

export const cah = Game({
  setup: () => ({
    currentBlackCard: "",
    currentCzarID: 0,
    name: "cah",
    playerID: null,
    playersID: [],
    winnerCards: [],
    playedCards: [],
    gameStarted: false,
    hand: [],
    blackCards: cards.blackCards,
    whiteCards: cards.whiteCards
  }),

  moves: {
    joinGame: (G, ctx, playerID) => {
      return {
        ...G,
        playerCount: G.playerCount + 1,
        playersID: [...G.playersID, playerID]
      };
    },
    startGame: G => {
      return { ...G, gameStarted: true };
    },
    drawCard: (G, ctx, playerID) => {
      const { card, deck } = drawCard(G.whiteCards);
      return {
        ...G,
        whiteCards: deck,
        hand: [...G.hand, { text: card, playerID: playerID }]
      };
    },
    playCard: (G, ctx, card) => {
      const cardIndex = G.hand.map(({ text }) => text).indexOf(card.text);

      // Removing played card from hand
      const newHand = [
        ...G.hand.slice(0, cardIndex),
        ...G.hand.slice(cardIndex + 1)
      ];

      return {
        ...G,
        hand: newHand,
        playedCards: [...G.playedCards, card]
      };
    },
    voteCard: (G, ctx, card) => {
      return {
        ...G,
        currentCzarID: (G.currentCzarID + 1) % ctx.numPlayers,
        winnerCards: [...G.winnerCards, card],
        playedCards: []
      };
    }
  },
  flow: {
    startingPhase: "setup",
    phases: {
      setup: {
        allowedMoves: ["joinGame", "startGame"],
        turnOrder: TurnOrder.ANY,
        endPhaseIf: G => G.gameStarted === true,
        next: "draw"
      },
      draw: {
        allowedMoves: ["drawCard"],
        onPhaseBegin: G => {
          const { card, deck } = drawCard(G.blackCards);
          return { ...G, blackCards: deck, currentBlackCard: card };
        },
        endTurnIf: G => {
          const playersHand = filterPlayerCards(G.hand, G.playerID);
          return playersHand.length === 10;
        },
        endPhaseIf: (G, ctx) => {
          return G.hand.length === ctx.numPlayers * 10;
        },
        turnOrder: TurnOrder.ANY,
        next: "play"
      },
      play: {
        allowedMoves: ["playCard"],
        endTurnIf: G => {
          return (
            G.playedCards
              .map(({ playerID }) => playerID)
              .indexOf(G.playerID) !== -1
          );
        },
        endPhaseIf: (G, ctx) =>
          G.playedCards.length === ctx.numPlayers * G.currentBlackCard.pick - 1,
        turnOrder: TurnOrder.ANY,
        next: "vote"
      },
      vote: {
        allowedMoves: ["voteCard"],
        endPhaseIf: G => G.playedCards.length === 0,
        turnOrder: TurnOrder.ANY,
        next: "vote"
      }
    },
    setActionPlayers: true
  }
});

export default cah;
