import PropTypes from "prop-types";
import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { WhiteCard } from "./WhiteCard";

interface ICard {
  playerID: string;
  text: string;
}

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
    playerID: "",
  };

  public playedCardsCount = ({
    playerID = "",
    playedCards = [],
  }: {
    playerID: string;
    playedCards: ICard[];
  }) => {
    const playersCardCount = playedCards
      .map(({ playerID: pId }: ICard) => pId)
      .filter((cardOwnerID) => cardOwnerID !== playerID).length;
    return playersCardCount;
  }

  public render() {
    const { G, ctx, playerID } = this.props;

    const isDisabled =
      ctx.phase !== "play" ||
      Number(playerID) === Number(G.currentCzarID) ||
      this.playedCardsCount({
        playedCards: G.playedCards,
        playerID,
      }) === G.currentBlackCard.pick;

    return (
      <ul
        data-test-id="players-hand"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
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
                // isDragDisabled={isDisabled}
              >
                {(provided) => (
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