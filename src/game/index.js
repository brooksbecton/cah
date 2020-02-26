import { Game, TurnOrder } from "boardgame.io/core";

import { cards } from "./../constants/cards";
import { drawCard } from "./../utils/drawCard";
import filterPlayerCards from "./../utils/filterPlayersCards";
import { replenishPlayersCards } from "./replenishPlayersCards";
import { defaultState } from "./defaultState";

export const cah = Game({
  setup: (ctx, setupData = {}) => {
    return { ...defaultState, ...setupData };
  },

  moves: {
    startGame: G => {
      return { ...G, gameStarted: true };
    },
    drawCard: (G, ctx, playerID) => {
      const cardsNeeded = G.cardLimit - G.whiteCards;
      const { card, deck } = drawCard(G.whiteCards);

      return {
        ...G,
        whiteCards: deck,
        hand: [...G.hand, { text: card, playerID: playerID }]
      };
    },
    playCard: (G, ctx, card) => {
      // Don't allow czar to play card on their turn
      if (Number(card.playerID) !== Number(G.currentCzarID)) {
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
      }
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
        allowedMoves: ["startGame"],
        turnOrder: TurnOrder.ANY,
        endPhaseIf: G => G.gameStarted === true,
        next: "draw"
      },
      draw: {
        allowedMoves: ["drawCard", "drawHand"],
        onPhaseBegin: G => {
          const { card, deck } = drawCard(G.blackCards);
          return { ...G, blackCards: deck, currentBlackCard: card };
        },
        endTurnIf: G => {
          const playersHand = filterPlayerCards(G.hand, G.playerID);
          return playersHand.length === G.cardLimit;
        },
        endPhaseIf: (G, ctx) => {
          return G.hand.length === ctx.numPlayers * G.cardLimit;
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
        onPhaseEnd: replenishPlayersCards,
        turnOrder: TurnOrder.ANY,
        next: "draw"
      }
    },
    setActionPlayers: true
  }
});

export default cah;
