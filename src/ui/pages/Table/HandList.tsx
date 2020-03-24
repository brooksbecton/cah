import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import { WhiteCard } from "./WhiteCard";
import { getPlayedCards } from "./../../../game/getPlayedCards";
import { ICard } from "./../../../game/types/index";

import { Meta } from "./../../../ui/Context/Meta";

interface IProps {
  cardList: ICard[];
}

export const HandList: React.FC<IProps> = ({ cardList }) => {
  const { G, playerId } = useContext(Meta);
  const isDisabled = () => {
    const isPlayerCzar = Number(playerId) === Number(G.currentCzarID);

    const currentBlackCard = G.currentBlackCard;
    const playerHasPlayedAllCards =
      getPlayedCards({
        playedCards: G.playedCards,
        playerID: playerId
      }).length === currentBlackCard.pick;

    return isPlayerCzar;
  };

  return (
    <ul
      data-test-id="players-hand"
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0
      }}
    >
      {cardList
        .filter(({ playerID: ownerID }) => ownerID === playerId)
        .map((card, index) => {
          return (
            <Draggable
              key={`${card.text}-${index}`}
              draggableId={`${card.text}-${index}`}
              index={index}
              isDragDisabled={isDisabled()}
            >
              {provided => (
                <li
                  ref={provided.innerRef}
                  key={card.text}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <WhiteCard text={card.text} />
                </li>
              )}
            </Draggable>
          );
        })}
    </ul>
  );
};
