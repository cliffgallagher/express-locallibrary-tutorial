describe('navigation_spec', () => {
    beforeEach(() => {
        
        cy.request('POST', 'users/login', {
            loginUsername: 'cliffgallagher',
            loginPassword: 'MyPassw0rd!',
            escapedUsername: 'cliffgallagher'.replaceAll('\'', '\\\''),
        })
        cy.wait(1000)
    })

    /*it('beforeEach works', () => {
        cy.visit('/')
        cy.contains('Add New Book')
    })*/

    it('Clicking "Logout" logs you out, and you are still logged out if you try to refresh page', () => {
        cy.visit('/')
        cy.get('#book_component').should('exist')
        cy.get('#login_component').should('not.exist')
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/logout/i).click()

        cy.get('#book_component').should('not.exist')
        cy.get('#login_component').should('exist')
        
        cy.visit('/')
        cy.get('#book_component').should('not.exist')
        cy.get('#login_component').should('exist')
    })

    it('After logging in, you stay logged in if you refresh page', () => {
        cy.visit('/')
        cy.visit('/')
        cy.get('#book_component').should('exist')
        cy.get('#login_component').should('not.exist')
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/logout/i).click()
        cy.get('#book_component').should('not.exist')
        cy.get('#login_component').should('exist')
    })

    it('after logging in, you are logged out if its been 15 minutes and you refresh page', () => {
        cy.clock()
        cy.visit('/')
        cy.tick(900001)
        //cy.visit('/')
        cy.findByRole('button', {
            name: /add new book/i
          }).click()
        cy.get('#book_component').should('exist')
        cy.get('#login_component').should('not.exist')
    })

})