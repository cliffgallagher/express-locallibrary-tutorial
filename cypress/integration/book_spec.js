describe('navigation_spec', () => {
    beforeEach(() => {
        
        cy.request('POST', 'users/login', {
            loginUsername: 'cliffgallagher',
            loginPassword: 'MyPassw0rd!',
            escapedUsername: 'cliffgallagher'.replaceAll('\'', '\\\''),
        })
        cy.wait(1000)
    })

    it('can create new book', () => {
        cy.visit('/')
        cy.findByRole('button', {
            name: /add new book/i
          }).click()
        cy.findByRole('textbox', {
            name: /title/i
          }).type('Pachinko')
        cy.findByRole('textbox', {
            name: /isbn/i
          }).type('1455563927')
        cy.findByRole('textbox', {
            name: /summary/i
          }).type('Published in 2017, Pachinko is an epic historical fiction novel following a Korean family that immigrates to Japan.')
        cy.findByRole('combobox', {
            name: /author/i
          }).select('Lee, Min Jin')
        cy.findByRole('combobox', {
            name: /genre/i
          }).select('Fiction')
        cy.findByRole('button', {
            name: /submit/i
          }).click()
        
        cy.get('[data-cy=new_book_form]').should('not.exist')
        cy.get('[data-cy=booklist').should('contain', 'Pachinko')
    })

})