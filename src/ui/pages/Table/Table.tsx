import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import DrawCardButton from "./../../components/DrawCardButton";
import { HandList } from "./HandList";
import { WhiteCard } from "./WhiteCard";
import { PhaseToast } from "./PhaseToast";
import { ICard, IGame, ICtx } from "./../../../game/types/index";
import { Meta } from "./../../Context/Meta";

interface IProps {
  G: IGame;
  playerID: string;
  ctx: ICtx;
  moves: any;
  gameID: string;
}

export const Table: React.FC<IProps> = ({
  G,
  ctx,
  playerID,
  moves,
  gameID
}) => {
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
      const playedCard = G.hand.filter(
        ({ playerID: ownerId }) => String(ownerId) === String(playerID)
      )[result.source.index];

      moves.playCard(playedCard, playerID);
    }
  };

  useEffect(() => {
    const x = G.hand.filter(({ playerID }) => playerID === playerID);
    setWhiteCards(x);
  }, [G.hand.length]);

  const filteredPlayedCards =
    // If the current player is the Czar then just hand back all the hards for voting
    Number(playerID) === G.currentCzarID
      ? G.playedCards
      : // Non-Czar players only get their cards
        G.playedCards.filter(
          card => Number(card.playerID) === Number(playerID)
        );

  return (
    <>
      <PhaseToast phase={ctx.phase} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Meta.Provider
          value={{
            G,
            ctx: ctx,
            playerId: playerID,
            gameId: gameID
          }}
        >
          {G.gameStarted === false || false ? (
            <>
              <button
                data-test-id="start-game-button"
                onClick={() => moves.startGame()}
              >
                Start Game
              </button>
            </>
          ) : (
            <>
              <DrawCardButton onClick={() => moves.drawCard(playerID)} />
              <TableContainer>
                <Droppable droppableId="black-card-area">
                  {provided => (
                    <div {...provided.droppableProps}>
                      <div
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          minHeight: 95,
                          padding: 11,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            marginBottom: 10,
                            fontWeight: "bold"
                          }}
                        >
                          {G.currentBlackCard.text}
                        </p>

                        <ul
                          data-test-id={"played-card-list"}
                          style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0
                          }}
                        >
                          {filteredPlayedCards.map(card => (
                            <li
                              ref={provided.innerRef}
                              key={card.text}
                              onClick={e =>
                                Number(playerID) === G.currentCzarID
                                  ? moves.voteCard(card)
                                  : null
                              }
                            >
                              <WhiteCard text={card.text} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <Droppable droppableId="white-card-area">
                  {provided => (
                    <div {...provided.droppableProps}>
                      <div
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: "#F4F4F4",
                          padding: 10
                        }}
                      >
                        <h2 style={{ fontSize: 14 }}>Your Cards</h2>
                        <HandList cardList={whiteCards} />
                        {/*
         
                  <h3>Winner Cards</h3>
                  <ul>
                    {G.winnerCards.map(card => (
                      <li key={card.text}>
                        {card.playerID}: {card.text}
                      </li>
                    ))}
                  </ul> */}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </TableContainer>
            </>
          )}
        </Meta.Provider>
      </DragDropContext>
    </>
  );
};

const TableContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }

  display: flex;
  flex-direction: row;

  .black-card-area {
  }
`;
