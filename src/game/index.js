import { Game, TurnOrder } from "boardgame.io/core";

import cards from "./../constants/cards.js";
import drawCard from "./../utils/drawCard";

export const game = Game({
  setup: () => ({
    hand: [],
    playedCards: [],
    blackCards: cards.blackCards,
    whiteCards: cards.whiteCards,
    deck: [],
    votes: []
  }),

  playerView: (G, ctx, playerID) => {
    playerID = playerID;
    return {
      ...G,
      // Only show players their cards
      hand: G.hand.filter(
        ({ playerID: cardOwnerId }) => cardOwnerId === playerID
      )
    };
  },

  moves: {
    drawCard: (G, ctx, playerID) => {
      const { card, deck } = drawCard(G.whiteCards);
      return {
        ...G,
        whiteCards: deck,
        hand: [...G.hand, { text: card, playerID }]
      };
    },
    playCard: (G, ctx, card) => {
      const cardIndex = G.hand
        .map(({ card }) => card) // Stripping out playerID
        .indexOf(card.text);

      const newHand = [
        ...G.hand.slice(0, cardIndex),
        ...G.hand.slice(cardIndex + 1)
      ];
      return { ...G, hand: newHand, playedCards: [...G.playedCards, cardText] };
    },
    flow: {
      phases: [
        {
          name: "draw phase",
          allowedMoves: ["drawCard"],
          endTurnIf: G => {
            console.log('endTurnIf');
            
            console.log(G);
            return G.hand.length === 10;
          },
          endPhaseIf: G => {
            console.log(G);
            return G.hand.length === 10;
          },
          turnOrder: TurnOrder.ONCE
        },
        {
          name: "play phase",
          allowedMoves: ["playCard"],
          endPhaseIf: (G, ctx) => G.playedCards.length === ctx.numPlayers
        },
        {
          name: "vote phase",
          allowedMoves: ["vote"],
          endPhaseIf: (G, ctx) => G.votes.length === ctx.numPlayers
        }
      ]
    }
  }
});

export default game;
