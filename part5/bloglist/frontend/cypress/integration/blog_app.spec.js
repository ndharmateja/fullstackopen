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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'dharma', password: 'pass' })
      cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
    })

    it.only('A blog can be created', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('New title')
      cy.get('#author').type('New author')
      cy.get('#url').type('New url')
      cy.get('#create-blog-button').click()

      cy.get('.notification')
        .should('contain', 'a new blog')
        .should('contain', 'added')
        .should('contain', '"New title"')
        .should('contain', 'New author')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'border-color', 'rgb(0, 128, 0)')

      cy.get('#blogs').contains('"New title"')
      cy.get('#blogs').contains('New author')
    })
  })
})
