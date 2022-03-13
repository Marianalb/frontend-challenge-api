describe('Feed tests', () => {

  const posts = [{
    "id": 1,
    "title": "Blog post #1",
    "author": "Olene Ogan",
    "publish_date": "2016-02-16",
    "slug": "blog-post-1",
    "description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
    "content": "<p>Ex legere perpetua electram vim, per nisl inermis quaestio ea. Everti adolescens ut nec. Quod labitur assueverit vis at, sea an erat modus delicata.</p>"
  },
  {
    "id": 2,
    "title": "Blog post #2",
    "author": "Olene Ogan",
    "publish_date": "2016-03-16",
    "slug": "blog-post-2",
    "description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
    "content": "<p>Ex legere perpetua electram vim, per nisl inermis quaestio ea. Everti adolescens ut nec. Quod labitur assueverit vis at, sea an erat modus delicata.</p>"
  }];

  const comments = [{
    "id": 1,
    "postId": 1,
    "parent_id": null,
    "user": "Amelia",
    "date": "2016-02-23",
    "content": "Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor."
  }];

  before(() => {
      Cypress.Server.defaults({ force404: true });
    });

    beforeEach(() => {
      cy.visit('http://localhost:3000');
    }); 
    
  it('Fails to load page', () => {
    cy.intercept('GET', 'http://localhost:9000/posts', '');
    cy.get('.MuiSnackbar-root').should('have.text', 'An error occurred while fetching');
  });

  it('Contains initial correct data and sorted by date', () => {
    cy.intercept('GET', 'http://localhost:9000/posts', posts).as('getPosts');
    cy.intercept('GET', 'http://localhost:9000/posts/1/comments', []).as('getEmptyComment');
    cy.intercept('GET', 'http://localhost:9000/posts/2/comments', comments).as('getComment');
    cy.wait(['@getPosts', '@getEmptyComment', '@getComment']);
    cy.get('.MuiSnackbar-root').should('not.exist');
    // validate is sorted by date
    cy.get('.MuiCardContent-root').should('have.length', 2).eq(0).should('contain', posts[1].title);
    cy.get('.MuiCardContent-root').should('have.length', 2).eq(1).should('contain', posts[0].title);
    // validate number of comments
    cy.get('.MuiCardContent-root > div > span > div').should('have.length', 2).eq(0).should('contain', 1);
    cy.get('.MuiCardContent-root > div > span > div').should('have.length', 2).eq(1).should('contain', 0);
  });

  it('go to post details page', () => {
    cy.intercept('GET', 'http://localhost:9000/posts', posts).as('getPosts');
    cy.wait('@getPosts');
    cy.get('.MuiCardContent-root > div > a').should('have.length', 2).eq(0).click();
    cy.url().should('include', '/post-details/2').should('not.include', '/post-details/1');
  });
});