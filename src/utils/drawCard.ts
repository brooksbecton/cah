import { IBlackCard, IWhiteCard } from "./../game/types";
import getRandomInt from "./getRandomInt";

/**
 * Takes in a deck of cards, draws a card out, and returns the new deck
 */
export function drawCard<CardType>(
  deck: CardType[],
): { deck: CardType[]; card: CardType } {
  const newCardIndex = getRandomInt(deck.length);
  const card = deck[newCardIndex];
  const newDeck: CardType[] = [
    ...deck.slice(0, newCardIndex),
    ...deck.slice(newCardIndex + 1),
  ];
  return { card, deck: newDeck };
}

export function drawCards<CardType>(deck: CardType[], cardsNeeded: number) {
  const cards = [];

  while (cardsNeeded !== cards.length) {
    const { card, deck: newDeck } = drawCard(deck);
    deck = newDeck;
    cards.push(card);
  }

  return { deck, cards };
}
