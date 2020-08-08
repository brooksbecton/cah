import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { InfoBar } from "./InfoBar";
import { HandList } from "./HandList";
import { WhiteCard } from "./WhiteCard";
import { ICard, IGame, ICtx } from "./../../../game/game/types";
import { Meta } from "./../../Context/Meta";
export interface IProps {
  G: IGame;
  ctx: ICtx;
  playerID: string;
  moves: any;
  gameID: string;
  gameMetadata: {
    [key: string]: {
      id: number;
      name: string;
    };
  };
}

export const Table: React.FC<IProps> = (props) => {
  const { G, ctx, playerID, moves, gameID } = props;
  const [whiteCards, setWhiteCards] = useState<ICard[]>([]);

  const reorder = (list: ICard[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "white-card-area") {
      const t = reorder(
        whiteCards,
        result.source.index,
        result.destination.index
      );

      setWhiteCards(t);
    }

    if (result.destination.droppableId === "black-card-area") {
      const playedCard = G?.hand.filter(
        ({ playerID: ownerId }) => String(ownerId) === String(playerID)
      )[result.source.index];

      moves.playCard(playedCard, playerID);
    }
  };

  useEffect(() => {
    const x = G?.hand.filter(({ playerID: pId }) => pId === playerID);
    setWhiteCards(x);
  }, [G.hand, setWhiteCards, playerID]);

  const filteredPlayedCards =
    // If the current player is the Czar then just hand back all the hards for voting
    Number(playerID) === G?.currentCzarID
      ? G?.playedCards
      : // Non-Czar players only get their cards
        G?.playedCards.filter(
          (card: ICard) => Number(card.playerID) === Number(playerID)
        );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Meta.Provider
          value={{
            G,
            ctx: ctx,
            playerId: playerID,
            gameId: gameID,
          }}
        >
          {G?.gameStarted === false ? (
            <>
              <button
                data-test-id="start-game-button"
                onClick={() => moves.startGame()}
                disabled={ctx.phase !== "setup"}
              >
                Start Game
              </button>
            </>
          ) : (
            <Container>
              <TableContainer>
                {G.gameOver === true && (
                  <Dialog data-test-id="win-dialog">
                    <p>Winner Winner Chicken Dinner</p>
                  </Dialog>
                )}

                <Droppable droppableId="black-card-area">
                  {(provided) => (
                    <BlackCardList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <ListHeader>{G?.currentBlackCard.text}</ListHeader>
                      <ul
                        data-test-id={"played-card-list"}
                        style={{
                          listStyle: "none",
                          margin: 0,
                          padding: 0,
                          height: "80%",
                        }}
                      >
                        {filteredPlayedCards.map((card) => (
                          <li
                            key={card.text}
                            onClick={(e) =>
                              Number(playerID) === G?.currentCzarID
                                ? moves.voteCard(card)
                                : null
                            }
                          >
                            <WhiteCard
                              author={
                                ctx.phase === "showcase"
                                  ? props.gameMetadata[card.playerID].name
                                  : ""
                              }
                              draggable={false}
                              winner={G.winnerCards
                                .map((c) => c.text)
                                .includes(card.text)}
                              text={card.text}
                            />
                          </li>
                        ))}
                      </ul>
                      {provided.placeholder}
                    </BlackCardList>
                  )}
                </Droppable>

                <Droppable droppableId="white-card-area">
                  {(provided) => (
                    <WhiteCardList>
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <ListHeader>Your Cards</ListHeader>
                        <HandList cardList={whiteCards} />
                        {provided.placeholder}
                      </div>
                    </WhiteCardList>
                  )}
                </Droppable>
              </TableContainer>
              <InfoBarContainer>
                <InfoBar
                  G={G}
                  phase={ctx.phase}
                  winnerCards={G.winnerCards}
                  gameMetadata={props.gameMetadata}
                />
              </InfoBarContainer>
              {ctx.phase === "showcase" && (
                <BottomToast data-test-id="showcase-continue-bar">
                  <p>Next Round</p>
                  <button
                    onClick={() => {
                      props.moves.endShowCase();
                    }}
                  >
                    Continue
                  </button>
                </BottomToast>
              )}
            </Container>
          )}
        </Meta.Provider>
      </DragDropContext>
    </>
  );
};

const BottomToast = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.whiteCard.bg};
  justify-content: center;

  p {
    margin-right: 15px;
  }

  button {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.blue};
    border: 0;
    font-size: 18px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  height: 100%;
`;
const TableContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
  background-color: ${({ theme }) => theme.whiteCard.bg};
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const WhiteCardList = styled.div`
  @media (max-width: 768px) {
    width: calc(100% - 56px);
  }
  height: 100%;
  padding: ${({ theme }) => theme.padding};
  background-color: ${({ theme }) => theme.whiteCard.bg};
  color: ${({ theme }) => theme.whiteCard.fg};
  width: 30vw;
`;

const BlackCardList = styled.div`
  @media (max-width: 768px) {
    width: calc(100% - 56px);
    min-height: 10%;
  }
  padding: ${({ theme }) => theme.padding};
  background-color: ${({ theme }) => theme.blackCard.bg};
  color: ${({ theme }) => theme.blackCard.fg};
  width: 30vw;
  :disabled {
    background-color: ${({ theme }) => `${theme.blackCard.bg}22`};
  }
`;

const ListHeader = styled.h2`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.padding};
  font-weight: bold;
  font-size: 16px;
`;

const InfoBarContainer = styled.div`
  background-color: red;
  position: fixed;
  right: 0;
  height: 100vh;
`;
