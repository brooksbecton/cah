describe('My First Test', function() {
    it('Does not do much!', function() {
        cy.visit("http://localhost:5555");
        cy.contains("input")
      expect(true).to.equal(true)
    })
  })