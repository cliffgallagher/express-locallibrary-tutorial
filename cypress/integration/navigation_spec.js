describe('navigation_spec', () => {
    beforeEach(() => {
        
        cy.request('POST', 'users/login', {
            loginUsername: 'cliffgallagher',
            loginPassword: 'MyPassw0rd!',
            escapedUsername: 'cliffgallagher'.replaceAll('\'', '\\\''),
        })
        cy.wait(1000)
        //cy.visit('/')
    })

    /*it('beforeEach works', () => {
        cy.visit('/')
        cy.contains('Add New Book')
    })*/

    it('Clicking "Logout" logs you out, and you are still logged out if you try to refresh page', () => {
        cy.visit('/')
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/logout/i).click()

        cy.get('p').should('contain', 'Please log in below')

        cy.visit('/')
        cy.get('p').should('contain', 'Please log in below')
    })

    it('After logging in, you stay logged in if you refresh page', () => {
        cy.visit('/')
        cy.visit('/')
        cy.contains('Add New Book')
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/logout/i).click()
        cy.get('p').should('contain', 'Please log in below')
    })

})