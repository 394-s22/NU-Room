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

  describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
  
    it ('populates form', () => {
        cy.visit ('/');
        cy.get('[data-cy=form]').should('contain', 'Basic Information');
    });
  
    it('shows Matches on navbar matches click', () => {
      cy.visit ('/');
      cy.get('[data-cy=navbarMatch]'').click();
      cy.get('[data-cy=match]').should('contain' ,'Unfortunately, there are no matches for you at this time. Check back at a later time');
    });
  });