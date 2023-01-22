
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('.write-product').type('Hello')
  })
})