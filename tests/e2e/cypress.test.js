describe('Formulaire submissions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Affiche le formulaire avec les bons champs', () => {
    cy.get('form').should('exist');
    cy.get('select[name="ticket_type"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="message"]').should('exist');
  });

  it('Soumission invalide (ticket_type manquant) affiche une erreur serveur', () => {
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="message"]').type('Un message');
    cy.get('form').submit();
    cy.contains('Type de ticket invalide').should('exist');
  });

  it('Soumission valide affiche confirmation', () => {
    cy.get('select[name="ticket_type"]').select('Bug');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="message"]').type('Ceci est un message de test.');
    cy.get('form').submit();
    cy.contains('Ticket soumis !').should('exist');
  });

  it('Accès admin à /tickets retourne la liste des tickets', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/tickets',
      auth: {
        username: Cypress.env('ADMIN_USER') || 'admin',
        password: Cypress.env('ADMIN_PASSWORD') || 'password'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      // Vérifie qu’au moins un ticket de test existe
      expect(response.body.some(t => t.email === 'test@example.com')).to.be.true;
    });
  });

  it('Accès admin à /tickets sans authentification retourne 401', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/tickets',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.contain('Auth required');
    });
  });
});