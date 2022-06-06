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
  
    // it('shows Matches on navbar matches click', () => {
    //   cy.visit ('/');
    //   cy.get('[data-cy=navbarMatch]').click();
    //   cy.get('[data-cy=match]').should('contain' ,'Unfortunately, there are no matches for you at this time. Check back at a later time');
    // });
  });






// Yemi Cypress test
// App should recognise when a user profile has not yet been created and we've navgated to the matches page
describe ('No Profile', () => {
  it('should recognise when a user profile has not yet been created and we\'ve navgated to the matches page', () => {
    cy.visit ('/');
    cy.get('[data-cy=navbarMatch]').click();
    cy.get('[data-cy=matchless]').should('contain', 'Unfortunately, you haven\'t created a profile yet');
  });

  it('should circle back to form page from matches page', () => {
    cy.visit ('/');
    cy.get('[data-cy=navbarMatch]').click();
    cy.get('[data-cy=profilebtn]').click();
    cy.get('[data-cy=form]').should('contain', 'Basic Information');
  });
});