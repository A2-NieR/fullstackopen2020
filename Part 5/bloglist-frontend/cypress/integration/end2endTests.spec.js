describe('Blog list E2E tests', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user1 = {
			name: 'Homer J. Simpson',
			username: 'homersimpson',
			password: 'donuts',
		};
		const user2 = {
			name: 'King Leonidas',
			username: ' KingOfSparta',
			password: 'Sparta300',
		};
		cy.request('POST', 'http://localhost:3001/api/users/', user1);
		cy.request('POST', 'http://localhost:3001/api/users/', user2);
		cy.visit('http://localhost:3000');
	});

	it('Login form shown first', function () {
		cy.contains('Log in');
		cy.contains('Username');
		cy.contains('Password');
	});

	describe('Login functionality', function () {
		it('Successful login with correct credentials', function () {
			cy.get('#username').type('homersimpson');
			cy.get('#password').type('donuts');
			cy.get('#loginButton').click();

			cy.get('.notification').contains('Successful login');
		});

		it('Failed login with wrong credentials', function () {
			cy.get('#username').type('homersimpson');
			cy.get('#password').type('duffbeer');
			cy.get('#loginButton').click();

			cy.get('.error').contains('Wrong');
		});

		it('Error message color is red', function () {
			cy.get('#username').type('homersimpson');
			cy.get('#password').type('duffbeer');
			cy.get('#loginButton').click();
			cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
		});
	});

	describe.only('When logged in', function () {
		beforeEach(function () {
			cy.get('#username').type('homersimpson');
			cy.get('#password').type('donuts');
			cy.get('#loginButton').click();
		});

		it('A blog can be created', function () {
			cy.contains('Add Blog').click();
			cy.get('#title').type('Mhh, Donuts');
			cy.get('#author').type('Homer J. Simpson');
			cy.get('#url').type('www.donuts.com');
			cy.get('#saveBlog').click();
			cy.contains('Mhh, Donuts');
		});
	});
});
