import { ICard } from "./types/index";

export const getPlayedCards = ({
  playerID = "",
  playedCards = []
}: {
  playerID: string;
  playedCards: ICard[];
}) => {
  const playersCardCount = playedCards
    .map(({ playerID: pId }: ICard) => pId)
    .filter(cardOwnerID => cardOwnerID !== playerID);
  return playersCardCount;
};
