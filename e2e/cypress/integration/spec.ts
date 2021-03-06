import { serverUrl } from "./../../../client/src/config/serverUrl";
import { getGames } from "./../../../client/src/game/utils/getGames";
import { IGame, ICard } from "./../../../client/src/game/game/types";
import { defaultState } from "./../../../client/src/game/game/defaultState";

function getByTestId(id: string) {
  return `[data-test-id="${id}"]`;
}

function createGame(numPlayers: number = 2, setupData: Partial<IGame> = {}) {
  return cy.request("POST", `${serverUrl}/games/default/create`, {
    numPlayers,
    setupData,
  });
}

function joinGame(gameId: string, playerName: string, playerID = 0) {
  return cy.request("POST", `${serverUrl}/games/default/${gameId}/join`, {
    playerName,
    playerID,
  });
}

const clientUrl =
  process.env.NODE_ENV === "production"
    ? `https://brooksbecton.github.io/cah/#`
    : `localhost:3000/#`;

function goHome() {
  cy.visit(clientUrl + "/cah");
}

function goToJoin(gameId: string = "") {
  cy.visit(`${clientUrl}/cah/join${gameId && `/${gameId}`}`);
}

describe("Game", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it("navigates to 'Join' pages from 'Home' page", () => {
    goHome();

    cy.get(getByTestId("NavigateToJoin")).click();

    cy.url().should("include", "/join");
  });

  it("can join game through 'Join' page", () => {
    createGame(2).then(({ body: { gameID } }) => {
      // P1 Join Game
      goToJoin();

      cy.get(getByTestId("gameId")).type(gameID);
      cy.get(getByTestId("playerName")).type("Brooks");
      cy.get(getByTestId("joinGame")).click();

      cy.url().should("include", gameID);
    });
  });
  it("pre-fills gameId from URL", () => {
    goToJoin("abc123");
    cy.get(getByTestId("gameId")).should("have.value", "abc123");
  });

  it("allows players to play cards", () => {
    const playState: Partial<IGame> = {
      gameStarted: true,
    };

    // Create a game
    createGame(2, playState).then(({ body: { gameID } }) => {
      // First Player Join
      joinGame(gameID, "Brooks").then(({ body: { playerCredentials } }) => {
        cy.visit(`${clientUrl}/cah/game/${gameID}/${playerCredentials}/1`);

        const firstCardSelector = `${getByTestId(
          `players-hand`
        )} li:first-child`;
        cy.get(firstCardSelector)
          .focus()
          .type(" ")
          .type("{rightarrow}")
          .type(" ");
        cy.get(getByTestId("played-card-list")).find("li");
      });
    });
  });
  it("only allows czar to vote on cards", () => {
    const voteState: Partial<IGame> = {
      gameStarted: true,
      currentCzarID: 0,
      playedCards: [{ text: "Winner Winner Chicken Dinner", playerID: "1" }],
    };

    createGame(2, voteState).then(({ body: { gameID } }) => {
      joinGame(gameID, "Brooks").then(({ body: { playerCredentials } }) => {
        cy.visit(`${clientUrl}/cah/game/${gameID}/${playerCredentials}/0`);

        cy.get(getByTestId("played-card-list")).find("li").click();
      });
    });
  });

  it("continues game if showcase is continued", () => {
    const showcaseState: Partial<IGame> = {
      gameStarted: true,
      isShowcasing: true,
      playedCards: [
        { text: "Winner Winner Chicken Dinner", playerID: "1" },
        { text: "Loser Loser double woozer?", playerID: "2" },
      ],
    };

    createGame(3, showcaseState).then(({ body: { gameID } }) => {
      joinGame(gameID, "Brooks").then(({ body: { playerCredentials } }) => {
        cy.visit(`${clientUrl}/cah/game/${gameID}/${playerCredentials}/0`);

        cy.get(getByTestId("showcase-continue-bar"))
          .contains("Continue")
          .click();

        cy.get(getByTestId("phase")).contains("PLAY");
      });
    });
  });
  it("marks winner cards", () => {
    const voteState: Partial<IGame> = {
      gameStarted: true,
      currentCzarID: 0,
      playedCards: [
        { text: "Winner Winner Chicken Dinner", playerID: "1" },
        { text: "Loser Loser double woozer?", playerID: "2" },
      ],
    };

    createGame(3, voteState).then(({ body: { gameID } }) => {
      joinGame(gameID, "Brooks").then(({ body: { playerCredentials } }) => {
        cy.visit(`${clientUrl}/cah/game/${gameID}/${playerCredentials}/0`);

        cy.get(getByTestId("played-card-list"))
          .find("li")
          .contains("Winner")
          .click()
          .parent()
          .get(getByTestId("winner-card"));

        cy.get(getByTestId("played-card-list"))
          .find("li")
          .contains("Loser")
          .parent()
          .not(getByTestId("winner-card"));
      });
    });
  });
  it("shows card authors after cards have been voted on", () => {
    const voteState: Partial<IGame> = {
      gameStarted: true,
      currentCzarID: 0,
      playedCards: [
        { text: "Winner Winner Chicken Dinner", playerID: "1" },
        { text: "Loser Loser double woozer?", playerID: "2" },
      ],
    };

    createGame(3, voteState).then(({ body: { gameID } }) => {
      joinGame(gameID, "Brooks").then(({ body: { playerCredentials } }) => {
        joinGame(gameID, "Hope", 1).then(() => {
          joinGame(gameID, "Peyton", 2).then(() => {
            cy.visit(`${clientUrl}/cah/game/${gameID}/${playerCredentials}/0`);

            cy.get(getByTestId("played-card-list"))
              .find("li")
              .contains("Winner")
              .click()
              .parent()
              .contains("Hope")
              .get(getByTestId("winner-card"));

            cy.get(getByTestId("played-card-list"))
              .find("li")
              .contains("Loser")
              .parent()
              .contains("Peyton")
              .not(getByTestId("winner-card"));
          });
        });
      });
    });
  });
  it("shows win state if a player has won", () => {
    const playedCards: ICard[] = [{ text: "asdfzkxjcygv", playerID: "0" }];
    const winningState: Partial<IGame> = {
      gameStarted: true,
      currentCzarID: 1,
      winningCardAmount: 1,
      playedCards,
    };
    createGame(2, winningState).then(({ body: { gameID } }) => {
      joinGame(gameID, "Brooks").then(() => {
        joinGame(gameID, "Hope", 1).then(({ body: { playerCredentials } }) => {
          cy.visit(`${clientUrl}/cah/game/${gameID}/${playerCredentials}/1`);
          cy.get(getByTestId("played-card-list")).find("li").click();

          cy.get(getByTestId("win-dialog"));
        });
      });
    });
  });

  describe("Info Bar", () => {
    it("shows the current phase", () => {
      const showcasingState: Partial<IGame> = {
        gameStarted: true,
      };

      createGame(2, showcasingState).then(({ body: { gameID } }) => {
        joinGame(gameID, "Brooks", 0).then(
          ({ body: { playerCredentials } }) => {
            cy.visit(`${clientUrl}/cah/game/${gameID}/${playerCredentials}/0`);
            cy.get(getByTestId("phase")).contains("PLAY");
          }
        );
      });
    });

    it("Shows players scores", () => {
      const wonCardsState: Partial<IGame> = {
        gameStarted: true,
        winnerCards: [
          { playerID: "1", text: "A" },
          { playerID: "1", text: "B" },
          { playerID: "1", text: "C" },
          { playerID: "0", text: "AB" },
        ],
      };

      createGame(3, wonCardsState).then(({ body: { gameID } }) => {
        joinGame(gameID, "Brooks", 0).then(() => {
          joinGame(gameID, "Hope", 1).then(() => {
            joinGame(gameID, "Peyton", 2).then(
              ({ body: { playerCredentials } }) => {
                cy.visit(
                  `${clientUrl}/cah/game/${gameID}/${playerCredentials}/1`
                );

                cy.get(getByTestId("player-score"))
                  .contains("Brooks")
                  .contains("1");
                cy.get(getByTestId("player-score"))
                  .contains("Hope")
                  .contains("3");
                cy.get(getByTestId("player-score"))
                  .contains("Peyton")
                  .contains("0");
              }
            );
          });
        });
      });
    });
  });
});
