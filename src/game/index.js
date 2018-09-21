import { Game, TurnOrder } from "boardgame.io/core";

import cards from "./../constants/cards.js";
import drawCard from "./../utils/drawCard";
import filterPlayerCards from "./../utils/filterPlayersCards";

export const game = Game({
  setup: () => ({
    winnerCards: [],
    playedCards: [],
    hand: [],
    blackCards: cards.blackCards,
    whiteCards: cards.whiteCards,
  }),

  playerView: (G, ctx) => {
    return {
      ...G,
      // Only show players their cards
      hand: filterPlayerCards(G.hand, ctx.currentPlayer)
    };
  },

  moves: {
    drawCard: (G, ctx) => {
      const { card, deck } = drawCard(G.whiteCards);
      return {
        ...G,
        whiteCards: deck,
        hand: [...G.hand, { text: card, playerID: ctx.currentPlayer }]
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
        winnerCards: [...G.winnerCards, card],
        playedCards: []
      };
    }
  },
  flow: {
    phases: [
      {
        name: "draw phase",
        allowedMoves: ["drawCard"],
        endTurnIf: (G, ctx) => {
          const playersHand = filterPlayerCards(G.hand, ctx.currentPlayer);
          return playersHand.length === 10;
        },
        endPhaseIf: (G, ctx) => {
          return G.hand.length === ctx.numPlayers * 10;
        }
      },
      {
        name: "play phase",
        allowedMoves: ["playCard"],
        endTurnIf: (G, ctx) => {
          return (
            G.playedCards
              .map(({ playerID }) => playerID)
              .indexOf(ctx.currentPlayer) !== -1
          );
        },
        endPhaseIf: (G, ctx) => G.playedCards.length === ctx.numPlayers
      },
      {
        name: "vote phase",
        allowedMoves: ["voteCard"],
        endPhaseIf: (G, ctx) => G.playedCards.length === 0
      }
    ]
  }
});

export default game;
