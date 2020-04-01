import { ICard } from "../game/types/index";

export function filterPlayersCards(cards: ICard[] = [], playerID: string) {
  return cards.filter(
    ({ playerID: cardOwnerId }) => Number(cardOwnerId) === Number(playerID)
  );
}
