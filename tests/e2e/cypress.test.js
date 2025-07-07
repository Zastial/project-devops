describe('Formulaire submissions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Affiche le formulaire', () => {
    cy.get('form').should('exist')
    cy.get('input[name="name"]').should('exist')
    cy.get('input[name="email"]').should('exist')
  })

  it('Affiche une erreur si champs vides', () => {
    cy.get('form').submit()
    cy.contains(/champs invalides/i)
  })

  it('Affiche une erreur si email invalide', () => {
    cy.get('input[name="name"]').type('Nathan')
    cy.get('input[name="email"]').type('notanemail')
    cy.get('form').submit()
    cy.contains(/champs invalides/i)
  })

  it('Redirige vers /submissions après une soumission valide', () => {
    cy.get('input[name="name"]').type('Nathan')
    cy.get('input[name="email"]').type('Nathan@mail.com')
    cy.get('button[type="submit"],input[type="submit"]').click()
    cy.url({ timeout: 10000 }).should('include', '/submissions')
    cy.contains('Soumissions')
    cy.contains('Nathan')
  })
})