import PropTypes from "prop-types";
import React, { Component } from "react";
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

  public static propTypes = {
    cardList: PropTypes.arrayOf(PropTypes.string),
    playCard: PropTypes.func,
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
          .map((card) => {
            return (
              <li key={card.text}>
                <div
                  style={{
                    alignItems: "flex-start",
                    backgroundColor: "white",
                    borderColor: "#707070",
                    borderStyle: "solid",
                    borderWidth: 1,
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: "bold",
                    height: 50,
                    marginBottom: 20,
                    padding: 10,
                  }}
                >
                  <p style={{ margin: 0 }}>{card.text}</p>
                </div>
              </li>
            );
          })}
      </ul>
    );
  }
}
