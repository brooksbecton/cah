import { url } from "../../src/config/url";
import { createGame } from "../../src/utils/createGame";
import { getGames } from "../../src/utils/getGames";

function getByTestId(id: string) {
  return `[data-test-id="${id}"]`;
}

function goHome() {
  cy.visit("localhost:5555");
}

describe("Game", function() {
  it("adds game id to #gameID input", function() {
    goHome();
    cy.get(getByTestId("createGameButton")).click();

    cy.get(getByTestId("gameId")).contains(/^.*/);
  });

  it("increments #numPlayers", function() {
    goHome();
    cy.get("#numPlayers").type("{uparrow}");

    cy.get("#numPlayers").should("have.value", "3");
  });
});

describe("Game", () => {
  const gameID: string | null = null;

  beforeEach(() => {
    goHome();
  });

  it("doesnt suck", () => {
    cy.get(getByTestId("gameId")).type("cat");
    cy.get(getByTestId("gameId")).should(($input) => {
      const inputValue = $input.val();
      expect(inputValue).eq("cat");
    });
  });

  it("lets players create a game", () => {
    cy.get(getByTestId("createGameButton")).click();
    cy.get(getByTestId("gameId")).should(($input) => {
      const gameId = $input.val();
      getGames().then(({ rooms }) => {
        const gameIds = rooms.map((r) => r.gameID);
        expect(gameIds).includes(String(gameId));
      });
    });
  });

  it("lets players join games", () => {
    cy.request("POST", `${url}/games/default/create`, { numPlayers: 2 }).then(
      (response) => {
        const gameID = response.body.gameID;
        cy.get(getByTestId("gameId")).type(String(gameID));
        cy.get(getByTestId("playerId")).type("1");
        cy.get(getByTestId("playerName")).type("Bob");

        cy.get(getByTestId("joinGame")).click();
        cy.url().should("include", gameID);
      },
    );
  });

  it("lets players draw up to 10 cards");
  it("allows players to play cards");
  it("only allows czar to vote on cards");
});
