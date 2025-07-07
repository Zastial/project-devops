describe('Formulaire submissions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Affiche le formulaire avec les bons champs', () => {
    cy.get('form').should('exist');
    cy.get('select[name="ticket_type"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('textarea[name="message"]').should('exist');
  });

  it('Soumission invalide (ticket_type manquant) affiche une erreur serveur', () => {
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('textarea[name="message"]').type('Un message');
    cy.get('form').submit();

    // Ton serveur renvoie 400 et "Type de ticket invalide" si ticket_type est invalide ou absent
    cy.contains('Type de ticket invalide').should('exist');
  });

  it('Soumission valide affiche confirmation', () => {
    // Choisir un ticket_type existant dans ta BDD, par exemple 'BUG'
    cy.get('select[name="ticket_type"]').select('BUG');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('Ceci est un message de test.');
    cy.get('form').submit();

    // Le serveur répond par "Ticket soumis !" (texte dans la page)
    cy.contains('Ticket soumis !').should('exist');
  });
});
