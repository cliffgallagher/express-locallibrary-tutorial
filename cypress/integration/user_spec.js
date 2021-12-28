describe('user_spec', () => {
    it('user can create new user and login', () => {
        //create new user
        cy.visit('http://localhost:3000')
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
        //login
    })
})