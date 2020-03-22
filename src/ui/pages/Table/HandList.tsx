import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

import { WhiteCard } from "./WhiteCard";
import { getPlayedCards } from "./../../../game/getPlayedCards";
import { ICard } from "./../../../game/types/index";

interface IProps {
  ctx: any;
  cardList: ICard[];
  G: any;
  playerID: string;
  playedCards: ICard[];
  playCard: (card: ICard) => void;
}

export class HandList extends Component<IProps> {
  public static defaultProps: IProps = {
    cardList: [],
    ctx: {},
    G: {},
    playCard: () => {
      throw new Error("playCard() not provided to <HandList/>");
    },
    playedCards: [],
    playerID: ""
  };

  public render() {
    const { G, ctx, playerID } = this.props;

    const isDisabled = () => {
      const isPlayerCzar = Number(playerID) === Number(G.currentCzarID);

      const currentBlackCard = G.currentBlackCard || {};
      const playerHasPlayedAllCards =
        getPlayedCards({
          playedCards: G.playedCards,
          playerID
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
        {this.props.cardList
          .filter(({ playerID: ownerID }) => ownerID === playerID)
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
  }
}
