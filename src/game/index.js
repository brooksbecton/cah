import { Game, TurnOrder } from "boardgame.io/core";

import cards from "./../constants/cards.js";
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
    startGame: (G, ctx) => {
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
    phases: [
      {
        name: "setup phase",
        allowedMoves: ["joinGame", "startGame"],
        turnOrder: TurnOrder.ANY,
        endPhaseIf: (G, ctx) => G.gameStarted === true
      },
      {
        name: "draw phase",
        allowedMoves: ["drawCard"],
        onPhaseBegin: G => {
          const { card, deck } = drawCard(G.blackCards);
          return { ...G, blackCards: deck, currentBlackCard: card };
        },
        endTurnIf: (G, ctx) => {
          const playersHand = filterPlayerCards(G.hand, G.playerID);
          return playersHand.length === 10;
        },
        endPhaseIf: (G, ctx) => {
          return G.hand.length === ctx.numPlayers * 10;
        },
        turnOrder: TurnOrder.ANY
      },
      {
        name: "play phase",
        allowedMoves: ["playCard"],
        endTurnIf: (G, ctx) => {
          return (
            G.playedCards
              .map(({ playerID }) => playerID)
              .indexOf(G.playerID) !== -1
          );
        },
        endPhaseIf: (G, ctx) =>
          G.playedCards.length === ctx.numPlayers * G.currentBlackCard.pick - 1,
        turnOrder: TurnOrder.ANY
      },
      {
        name: "vote phase",
        allowedMoves: ["voteCard"],
        endPhaseIf: (G, ctx) => G.playedCards.length === 0,
        turnOrder: TurnOrder.ANY
      }
    ],
    setActionPlayers: true
  }
});

export default cah;
