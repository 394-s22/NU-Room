/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
  
  });

  describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
  
    it ('populates form', () => {
      cy.visit ('/');
      cy.get('[data-cy=form]').should('contain', 'Basic Information');
    });
  });