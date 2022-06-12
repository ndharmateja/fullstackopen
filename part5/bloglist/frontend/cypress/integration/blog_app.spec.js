describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'dharma',
      password: 'pass',
      name: 'Dharma',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#login-form')
    cy.get('logged in').should('not.exist')
  })

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type('dharma')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'logged in')
      cy.contains('Log in to application')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('dharma')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('Dharma logged in')
      cy.contains('logout')
    })
  })
})
