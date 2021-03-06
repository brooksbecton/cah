import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import { WhiteCard } from "./WhiteCard";
import { ICard } from "./../../../game/game/types/index";

import { Meta } from "./../../../ui/Context/Meta";

interface IProps {
  cardList: ICard[];
}

export const HandList: React.FC<IProps> = ({ cardList }) => {
  const { G, playerId = "" } = useContext(Meta);
  const isDisabled = () => {
    const isPlayerCzar = Number(playerId) === Number(G?.currentCzarID);

    return isPlayerCzar;
  };

  return (
    <ul
      data-test-id="players-hand"
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
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
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  key={card.text}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <WhiteCard
                    draggable={isDisabled() === false}
                    text={card.text}
                  />
                </li>
              )}
            </Draggable>
          );
        })}
    </ul>
  );
};
