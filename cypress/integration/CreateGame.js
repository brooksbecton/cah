describe("Create Game", function() {
  it("adds game id to #gameID input", function() {
    cy.visit(Cypress.env("HOST") + ":" + Cypress.env("PORT"));
    cy.get("#createGameButton").click();

    cy.get("#gameID").contains(/^.*/);
  });

  it("increments #numPlayers", function() {
    cy.visit(Cypress.env("HOST") + ":" + Cypress.env("PORT"));
    cy.get("#numPlayers").type("{uparrow}");

    cy.get("#numPlayers").should("have.value", "3");
  });
});
