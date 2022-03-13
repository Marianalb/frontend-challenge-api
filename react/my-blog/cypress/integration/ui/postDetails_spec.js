describe('Post details tests', () => {
	before(() => {
			Cypress.Server.defaults({ force404: true });
		});

		const post = {
			"id": 1,
			"title": "Blog post #1",
			"author": "Olene Ogan",
			"publish_date": "2016-02-16",
			"slug": "blog-post-1",
			"description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
			"content": "Ex legere perpetua electram vim, per nisl inermis quaestio ea. Everti adolescens ut nec. Quod labitur assueverit vis at, sea an erat modus delicata."
		};

		const comments = [{
			"id": 1,
			"postId": 1,
			"parent_id": null,
			"user": "Amelia",
			"date": "2016-02-23",
			"content": "Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor."
		}];

	beforeEach(() => {
		cy.intercept('GET', 'http://localhost:9000/posts/1/comments', comments).as('getComments');
		cy.intercept('GET', 'http://localhost:9000/posts/1', post).as('getPost');
		cy.visit('http://localhost:3000/post-details/1');
	});
	
	it('go to feed page', () => {
		cy.get('.MuiGrid-root > a').click();
		cy.url().should('include', 'http://localhost:3000/');
	});

	it('contains correct data', () => {
		cy.get('.MuiGrid-root > p').eq(0).should('have.text', `Author: ${post.author}`);
		cy.get('.MuiGrid-root > p').eq(1).should('have.text', post.publish_date);
		cy.get('.MuiTypography-root.MuiTypography-h3').should('have.text', post.title);
		cy.get('.MuiTypography-root.MuiTypography-h4').contains(post.content);
		// validate comments
		cy.get('.MuiGrid-root.MuiGrid-container > p').eq(2).should('have.text', `user: ${comments[0].user}`);
		cy.get('.MuiGrid-root.MuiGrid-container > p').eq(3).should('have.text', comments[0].date);
		cy.get('.MuiPaper-root > div > p').should('have.text', comments[0].content);
	});

	it('create new comment', () => {
		cy.intercept('PUT', 'http://localhost:9000/comments/**').as('putComment');
		cy.intercept('POST', 'http://localhost:9000/posts/1/comments').as('postComment');
		cy.get('.MuiButton-root > span').eq(1).click({force: true});
		cy.get('.MuiOutlinedInput-root > input').click().type('user1');
		cy.get('#comment').click().type('DummyComment');
		cy.get('.MuiCardContent-root > .MuiButtonBase-root').eq(1).click();
		cy.wait('@postComment').its('response.statusCode').then(($rsp) => {
      expect($rsp).to.equal(201);
    });
		cy.wait('@putComment').its('response.statusCode').then(($rsp) => {
      expect($rsp).to.equal(200);
    });
		cy.wait('@getComments');
	});

	it('cancel create new comment', () => {
		cy.intercept('PUT', 'http://localhost:9000/comments/**').as('putComment');
		cy.intercept('POST', 'http://localhost:9000/posts/1/comments').as('postComment');
		cy.get('.MuiButton-root > span').eq(1).click({force: true});
		cy.get('.MuiOutlinedInput-root > input').click().type('user1');
		cy.get('#comment').click().type('DummyComment');
		cy.get('.MuiCardContent-root > .MuiButtonBase-root').eq(0).click();
		cy.get('@postComment').should('be.null');
		cy.get('@putComment').should('be.null');
	});
});