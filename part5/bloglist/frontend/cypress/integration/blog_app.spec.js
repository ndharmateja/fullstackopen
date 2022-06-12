describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
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
    })

    it('A blog can be created', function () {
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

    describe('Delete', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'title (dharma)',
          author: 'author (dharma)',
          url: 'url (dharma)',
        })

        cy.createUser({
          username: 'bindu',
          password: 'pass',
          name: 'Bindu',
        })
        cy.login({ username: 'bindu', password: 'pass' })
        cy.createBlog({
          title: 'title (bindu)',
          author: 'author (bindu)',
          url: 'url (bindu)',
        })
      })

      it('user can delete their blog', function () {
        cy.get('#blogs').contains('title (bindu)').parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('remove').click()
        cy.wait(500)

        cy.get('#blogs').should('not.contain', 'title (bindu)')
      })

      it('user cannot delete blog of another person', function () {
        cy.get('#blogs').contains('title (dharma)').parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').should('not.contain', 'remove')
      })
    })

    describe('when there are multiple blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' })
        cy.createBlog({ title: 'title3', author: 'author3', url: 'url3' })
      })

      it('A blog can be liked', function () {
        cy.get('#blogs').contains('title2').parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('Likes').parent().as('likesSpan')

        cy.get('@likesSpan').contains('like').as('likeButton')

        cy.get('@likesSpan')
          .find('span')
          .invoke('text')
          .then((text1) => {
            cy.debug(text1)
            cy.get('@likeButton').click()
            cy.wait(1000)
            cy.get('@likesSpan')
              .find('span')
              .invoke('text')
              .then((text2) => {
                const likesBefore = Number.parseInt(text1)
                const likesAfter = Number.parseInt(text2)
                expect(likesAfter).to.eq(likesBefore + 1)
              })
          })
      })

      it.only('blogs are ordered by number of likes', function () {
        for (let i = 0; i < 3; i++) {
          cy.likeBlog({ title: 'title1' })
          cy.wait(1000)
        }
        for (let i = 0; i < 2; i++) {
          cy.likeBlog({ title: 'title2' })
          cy.wait(1000)
        }
        for (let i = 0; i < 5; i++) {
          cy.likeBlog({ title: 'title3' })
          cy.wait(1000)
        }

        cy.get('.blog').eq(0).should('contain', 'title3')
        cy.get('.blog').eq(1).should('contain', 'title1')
        cy.get('.blog').eq(2).should('contain', 'title2')
      })
    })
  })
})
