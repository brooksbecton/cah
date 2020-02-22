import { replenishPlayersCards } from "./replenishPlayersCards";

import { defaultState } from "./defaultState";
import { IGame } from "./types";

describe("onVoteEnd", () => {
  it("replenishes players cards", () => {
    const fakeHand = [{ playerID: "1", text: "Hot Cocoa" }];
    const cardsNeeded = defaultState.cardLimit - fakeHand.length;

    const G: Partial<IGame> = replenishPlayersCards({
      ...defaultState,
      hand: fakeHand
    });

    // Check players hand size
    expect(G.hand.length).toEqual(G.cardLimit);

    // Make sure cards are removed from the white cards deck
    expect(G.whiteCards.length).toEqual(
      defaultState.whiteCards.length - cardsNeeded
    );
  });
});
