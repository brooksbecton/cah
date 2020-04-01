import { url } from "./../../../client/src/config/url";
import { getGames } from "./../../../client/src/game/utils/getGames";
import { IGame } from "./../../../client/src/game/game/types";

function getByTestId(id: string) {
  return `[data-test-id="${id}"]`;
}

function createGame(numPlayers: number = 2, setupData: Partial<IGame> = {}) {
  return cy.request("POST", `${url}/games/default/create`, {
    numPlayers,
    setupData
  });
}

function goHome() {
  cy.visit(`localhost:3000`);
}

describe("Game", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    goHome();
  });

  it.skip("adds game id to #gameID input", () => {
    goHome();
    cy.get(getByTestId("createGameButton")).click();

    cy.get(getByTestId("gameId")).contains(/^.*/);
  });

  it.skip("lets players create a game", () => {
    cy.get(getByTestId("createGameButton")).click();
    cy.get(getByTestId("gameId")).should($input => {
      const gameId = $input.val();
      getGames().then(({ rooms }) => {
        const gameIds = rooms.map(r => r.gameID);
        expect(gameIds).should("include", String(gameId));
      });
    });
  });
  it.skip("lets players join games", () => {
    createGame().then(response => {
      const gameID = response.body.gameID;
      cy.get(getByTestId("gameId")).type(String(gameID));
      cy.get(getByTestId("playerId")).type("1");
      cy.get(getByTestId("playerName")).type("Bob");

      cy.get(getByTestId("joinGame")).click();
      cy.url().should("include", gameID);
    });
  });

  it("allows players to play cards", () => {
    // Create a gmae
    createGame(2).then(({ body: { gameID } }) => {
      // P1 Join Game
      cy.get(getByTestId("gameId")).type(String(gameID));
      cy.get(getByTestId("playerId")).type("0");
      cy.get(getByTestId("playerName")).type("Brooks");
      cy.get(getByTestId("joinGame")).click();

      cy.url().should("include", gameID);

      cy.get(getByTestId("start-game-button")).click();

      goHome();

      cy.get(getByTestId("gameId")).type(String(gameID));
      cy.get(getByTestId("playerId")).type("1");
      cy.get(getByTestId("playerName")).type("Hope");
      cy.get(getByTestId("joinGame")).click();

      const firstCardSelector = `${getByTestId(`players-hand`)} li:first-child`;
      cy.get(firstCardSelector)
        .focus()
        .type(" ")
        .type("{rightarrow}")
        .type(" ");
      cy.get(getByTestId("played-card-list")).find("li");
    });
  });
  it("only allows czar to vote on cards");
});
