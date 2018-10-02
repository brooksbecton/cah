import getRandomInt from "./getRandomInt";
/**
 * @typedef newDeckObj
 * @property {blackCard[] | whiteCard[]} deck
 * @property {blackCard | whiteCard} card
 */

/**
 * Takes in a deck of cards, draws a card out, and returns the new deck
 * @param {blackCard[] | whiteCard[]} cards
 * @returns {newDeckObj}
 */
function drawCard(deck) {
  const newCardIndex = getRandomInt(deck.length);
  const card = deck[newCardIndex];
  deck = [...deck.slice(0, newCardIndex), ...deck.slice(newCardIndex + 1)];

  return { card, deck };
}

export default drawCard;
