
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('.nav-bar button').click({multiple: true})
  })
})