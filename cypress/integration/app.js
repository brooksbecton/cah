import request from "superagent";

function getByTestId(id) {
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
  it("lets players join game", async () => {
    const gameId = await request
      .post("http://localhost:5556/games/default/create")
      .send({
        numPlayers: 2
      })
      .end((err, { body }) => {
        if (!err) {
          return body.gameID;
        } else {
          throw new Error(`Error Creating Game: numPlayers ${numPlayers} `);
        }
      });
    console.log(gameId);
    cy.get(getByTestId("gameId")).type(gameId);
    cy.get('[data-test-id="join-game-button"]').click();
    cy.get('[data-test-id="phase"]').eq("");
  });
  it("lets players draw up to 10 cards");
  it("allows players to play cards");
  it("only allows czar to vote on cards");
});
