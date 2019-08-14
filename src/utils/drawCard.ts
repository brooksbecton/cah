import getRandomInt from "./getRandomInt";

interface IWhiteCard {
  text: string;
  pick: number;
}
type ICard = IWhiteCard | string;
type IDeck = ICard[];
/**
 * Takes in a deck of cards, draws a card out, and returns the new deck
 */
export function drawCard(deck: IDeck): { deck: IDeck; card: ICard } {
  const newCardIndex = getRandomInt(deck.length);
  const card = deck[newCardIndex];
  const newDeck: IDeck = [
    ...deck.slice(0, newCardIndex),
    ...deck.slice(newCardIndex + 1),
  ];
  return { card, deck: newDeck };
}

export function drawCards(deck: IDeck, cardsNeeded: number) {
  const cards = [];

  while (cardsNeeded !== cards.length) {
    const { card, deck: newDeck } = drawCard(deck);
    deck = newDeck;
    cards.push(card);
  }

  return { deck, cards };
}
