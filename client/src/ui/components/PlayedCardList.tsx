import React, { useContext } from "react";

import { Meta } from "../Context/Meta";
import { ICard } from "../../game/game/types";

interface IProps {
  playedCards: ICard[];
  voteCard: (card: ICard) => void;
}

const PlayedCardsList: React.FC<IProps> = ({ playedCards, voteCard }) => {
  const { G, ctx, playerId } = useContext(Meta);

  return (
    <ul data-test-id="played-card-list">
      {playedCards.map(card => (
        <li key={card.text}>
          {card.text}
          playerId {card.playerID}
          <button
            disabled={
              ctx?.phase !== "vote" ||
              Number(playerId) !== Number(G?.currentCzarID)
            }
            onClick={() => voteCard(card)}
            data-test-id="vote-card-button"
          >
            Vote
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PlayedCardsList;
