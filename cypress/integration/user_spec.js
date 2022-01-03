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
  })

  it('leaving fields blank in NewUserSignup returns validation errors', () => {
    cy.visit('/')
    cy.findByText(/create new user/i).click()
    cy.findByRole('button', {
        name: /create user/i
      }).click()
    
    cy.get('ul')
      .should('contain', 'First name cannot be blank')
      .should('contain', 'Last name cannot be blank')
      .should('contain', 'Please enter a valid email address')
      .should('contain', 'Password must be between 8 and 16 characters long')
      .should('contain', 'Password must contain 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character') 
  })

  it('entering two different passwords returns correct error', () => {
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
    cy.contains("Confirm Password").type("DifferentPassw#rd54*")
    cy.findByRole('checkbox', {
        name: /show password/i
      }).click()
    cy.findByRole('button', {
        name: /create user/i
      }).click()
    
    cy.get('ul').should('contain', 'Password confirmation does not match password')        
  })  

  it('entering duplicate username returns correct error', () => {
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
      }).type("seanjones2@yahoo.com")
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
    
    cy.get('ul').should('contain', 'That username already exists in the database. Please pick a different username.')        
  })

  it('entering duplicate email returns correct error', () => {
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
      }).type("seanjones2")
    cy.contains("Password").type("SeanPassw#rd54*")
    cy.contains("Confirm Password").type("SeanPassw#rd54*")
    cy.findByRole('checkbox', {
        name: /show password/i
      }).click()
    cy.findByRole('button', {
        name: /create user/i
      }).click()
    
    cy.get('ul').should('contain', 'That email already exists in the database. Please pick a different email.')        
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

  it('entering nonexistent username returns correct error', () => {
    cy.visit('/')
    cy.findByRole('textbox', {
        name: /username/i
      }).type("i'mnotreal")
    cy.findByLabelText(/password/i).type("SeanPassw#rd54*")
    cy.findByRole('button', {
        name: /login/i
      }).click()
    
      cy.get('ul').should('contain', 'Incorrect username/password')
  })

  it('entering nonexistent password returns correct error', () => {
    cy.visit('/')
    cy.findByRole('textbox', {
        name: /username/i
      }).type("seanjones")
    cy.findByLabelText(/password/i).type("RubbishPassw#rd54*")
    cy.findByRole('button', {
        name: /login/i
      }).click()
    
      cy.get('ul').should('contain', 'Incorrect username/password')
  })

  it('entering nonexistent username and password returns correct error', () => {
    cy.visit('/')
    cy.findByRole('textbox', {
        name: /username/i
      }).type("d")
    cy.findByLabelText(/password/i).type("dPassw#rd54*")
    cy.findByRole('button', {
        name: /login/i
      }).click()
    
      cy.get('ul').should('contain', 'Incorrect username/password')
  })

})