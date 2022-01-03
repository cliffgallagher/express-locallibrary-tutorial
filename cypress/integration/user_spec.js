describe('user_spec', () => {
    it('user can create new user', () => {
        //create new user
        cy.visit('/')
        cy.findByText(/create new user/i).click()
        cy.findByRole('textbox', {
            name: /first name/i
          }).type("Sean")
        cy.findByRole('textbox', {
            name: /last name/i
          }).type("Jones")
        cy.findByRole('textbox', {
            name: /email/i
          }).type("seanjones@yahoo.com")
        cy.findByRole('textbox', {
            name: /username/i
          }).type("seanjones")
        cy.contains("Password").type("SeanPassw#rd54*")
        cy.contains("Confirm Password").type("SeanPassw#rd54*")
        cy.findByRole('checkbox', {
            name: /show password/i
          }).click()
        cy.findByRole('button', {
            name: /create user/i
          }).click()
        
        cy.get('p').should('contain', 'New user created. Redirecting to login page...')
        //cy.expect('[data-cy=new_user_created]').to.exist
        //cy.get('[data-cy=submit]').click()
        
    })

    it('can login', () => {
        cy.visit('/')
        cy.findByRole('textbox', {
            name: /username/i
          }).type("seanjones")
        cy.findByLabelText(/password/i).type("SeanPassw#rd54*")
        cy.findByRole('button', {
            name: /login/i
          }).click()
        
        cy.wait(1000)
        cy.getCookie('token').should('exist')
        //cy.expect('[data-cy=book_component]').to.exist
        cy.contains('Add New Book')
    })

})