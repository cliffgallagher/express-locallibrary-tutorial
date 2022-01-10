describe('author_spec', () => {
    beforeEach(() => {
  
        cy.task('db:reset_authors')
        
        cy.request('POST', 'users/login', {
            loginUsername: 'cliffgallagher',
            loginPassword: 'MyPassw0rd!',
            escapedUsername: 'cliffgallagher'.replaceAll('\'', '\\\''),
        })
        cy.wait(1000)

        cy.visit('/')
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/authors/i).click()
    })

    /*
    *
    * Can create a new alive author
    */
    it('can create new alive author', () => {
        cy.findByRole('button', {
            name: /add new author/i
          }).click()
        
        cy.wait(1000)

        cy.get('[data-cy=new_author_form]').should('exist')

        cy.findByRole('textbox', {
            name: /first name/i
          }).type('Nick')
        cy.findByRole('textbox', {
            name: /family name/i
          }).type('Hornby')
        cy.findByLabelText(/date of birth/i).type('1957-04-17')
        cy.findByLabelText(/date of death/i).type('1957-04-18')
        cy.findByRole('button', {
            name: /submit/i
        }).click()

        cy.wait(1000)

        cy.get('[data-cy=new_author_form]').should('not.exist')

        cy.get('[data-cy=author_list_element]').then(($listElement) => {
            expect($listElement[3])
                .to.contain('Hornby, Nick')
                .to.contain('Born: 04-17-1957')
        })
        cy.get('[data-cy=author_info_death_date]').contains(/\d/).then(($deadAuthors) => {
            cy.log($deadAuthors)
        })
    })
})