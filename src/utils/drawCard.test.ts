import { drawCards } from "./drawCard";

describe("drawCard", () => {
  it("draws the cardsNeeded amount of cards", () => {
    const { deck, cards } = drawCards(["a", "b", "c"], 3);

    expect(cards.length).toEqual(3);
    expect(deck.length).toEqual(0);
  });
});
