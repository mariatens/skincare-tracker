
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('.opened').click()
    cy.contains('Date Opened')
  })
})