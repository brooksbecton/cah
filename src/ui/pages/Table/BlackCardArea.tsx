import * as React from "react";
import { Droppable } from "react-beautiful-dnd";

import { WhiteCard } from "./WhiteCard";

interface IProps {
  blackCardText: string;
  currentCzarId: number;
  currentPlayerId: number;
  playedCards: Array<{ playerID: string; text: string }>;
}

export const BlackCardArea = ({
  blackCardText,
  currentCzarId,
  currentPlayerId,
  playedCards,
}: IProps) => {
  const filteredPlayedCards =
    // If the current player is the Czar then just hand back all the hards for voting
    currentPlayerId === currentCzarId
      ? playedCards
      : // Non-Czar players only get their cards
        playedCards.filter((card) => Number(card.playerID) === currentPlayerId);
  return (
    <Droppable droppableId="black-card-area">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              minHeight: 95,
              padding: 30,
              width: "100%",
            }}
          >
            <p style={{ margin: 0, marginBottom: 10, fontWeight: "bold" }}>
              {blackCardText}
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {filteredPlayedCards.map((card) => (
                <li ref={provided.innerRef} key={card.text}>
                  <WhiteCard text={card.text} />
                </li>
              ))}
            </ul>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
