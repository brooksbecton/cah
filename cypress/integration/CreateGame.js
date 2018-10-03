describe("Create Game", function() {
  it("adds game id to #gameID input", function() {
    cy.visit("http://localhost:5555");
    cy.get("#createGameButton").click();

    cy.get("#gameID").contains(/^.*/);
  });

  it("increments #numPlayers", function() {
    cy.visit("http://localhost:5555");
    cy.get("#numPlayers").type("{uparrow}");

    cy.get("#numPlayers").should("have.value", "3");
  });
});
