describe('navigation_spec', () => {
    beforeEach(() => {
        
        cy.request('POST', 'users/login', {
            loginUsername: 'cliffgallagher',
            loginPassword: 'MyPassw0rd!',
            escapedUsername: 'cliffgallagher'.replaceAll('\'', '\\\''),
        })
        cy.wait(1000)
        cy.visit('/')
    })

    it('beforeEach works', () => {
        cy.visit('/')
        cy.contains('Add New Book')
    })

})