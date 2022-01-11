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
        cy.findByRole('button', {
            name: /submit/i
        }).click()

        cy.wait(1000)

        // NewAuthorForm should be gone
        cy.get('[data-cy=new_author_form]').should('not.exist')

        // AuthorList should include Nick Hornby now
        cy.get('[data-cy=author_list_element]').then(($listElement) => {
            expect($listElement[3])
                .to.contain('Hornby, Nick')
                .to.contain('Born: 04-17-1957')
        })
        
        // Nick Hornby AuthorListElement should not have a date of death
        cy.get('[data-cy=author_info]').then(($authors) => {
            const hornby = $authors[3]
            return hornby
        }).then(($hornby) => {
            expect($hornby.prop('innerHTML'))
                .to.contain('<p data-cy="author_info_death_date">Died: </p>')
        })
    })

    /*
    *
    * Can create a new dead author
    */
    it('can create new dead author', () => {
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

        // NewAuthorForm should be gone
        cy.get('[data-cy=new_author_form]').should('not.exist')

        // AuthorList should include Nick Hornby now
        cy.get('[data-cy=author_list_element]').then(($listElement) => {
            expect($listElement[3])
                .to.contain('Hornby, Nick')
                .to.contain('Born: 04-17-1957')
        })
        
        // Nick Hornby AuthorListElement should have a date of death
        cy.get('[data-cy=author_info]').then(($authors) => {
            const hornby = $authors[3]
            return hornby
        }).then(($hornby) => {
            expect($hornby.prop('innerHTML'))
                .to.contain('<p data-cy="author_info_death_date">Died: 04-18-1957</p>')
        })
    })

    /*
    *
    * adding new author with empty fields will trigger validation warnings. Also, adding incorrect date of death     * will trigger various warnings
    */
   it('can trigger validation warnings on NewAuthorForm', () => {
        cy.findByRole('button', {
            name: /add new author/i
        }).click()

        // NewAuthorForm should exist when you click the Add New Author Button
        cy.get('[data-cy=new_author_form]').should('exist')

        cy.findByRole('button', {
            name: /submit/i
        }).click()

        cy.wait(1000)

        // check the non-death-date validation warnings
        cy.get('ul')
            .should('contain', 'First name cannot be empty')
            .should('contain', 'Family name cannot be empty')
            .should('contain', 'Date of birth cannot be empty')

        // check the death-date  validation warnings
        cy.findByRole('textbox', {
            name: /first name/i
            }).type('Nick')
        cy.findByRole('textbox', {
            name: /family name/i
            }).type('Hornby')
        
        // date of death should be after date of birth AND dob cannot be in future
        cy.findByLabelText(/date of death/i).type('1956-04-17')
        cy.findByLabelText(/date of birth/i).type('2023-04-17')

        cy.findByRole('button', {
            name: /submit/i
        }).click()

        cy.wait(1000)

        cy.get('ul')
            .should('not.contain', 'First name cannot be empty')
            .should('not.contain', 'Family name cannot be empty')
            .should('not.contain', 'Date of birth cannot be empty')
            .should('contain', 'Date of birth cannot be after date of death')
            .should('contain', 'Date of birth cannot be a future date')

        cy.findByLabelText(/date of death/i).type('2023-04-17')
        cy.findByLabelText(/date of birth/i).type('2021-04-02')

        cy.findByRole('button', {
            name: /submit/i
        }).click()

        cy.wait(1000)

        cy.get('ul')
            .should('not.contain', 'First name cannot be empty')
            .should('not.contain', 'Family name cannot be empty')
            .should('not.contain', 'Date of birth cannot be empty')
            .should('not.contain', 'Date of birth cannot be after date of death')
            .should('not.contain', 'Date of birth cannot be a future date')
            .should('contain', 'Date of death cannot be a future date')
   })

    /*
    *
    * update an author that won't trigger a duplicate warning
    */
    it.only('can update an author that will not trigger a duplicate warning', () => {
        cy.contains('Smith, Zadie').click()

        cy.findByRole('button', {
            name: /update/i
          }).click()

        cy.wait(1000)

        //make sure correct  values populated on PopupForUpdate
        //Make sure first name equals Zadie
        cy.get('[data-cy=author_update_first_name]').then(($firstName) => {
            const defaultValue = $firstName.prop('value')
            return defaultValue
        }).then((defaultValue) => {
            expect(defaultValue).to.equal('Zadie')
        })

        //Make sure family name equals Smith
        cy.get('[data-cy=author_update_family_name]').then(($familyName) => {
            const defaultValue = $familyName.prop('value')
            return defaultValue
        }).then((defaultValue) => {
            expect(defaultValue).to.equal('Smith')
        })

        //Make sure date of birth is 1975-10-25
        cy.get('[data-cy=author_update_date_of_birth]').then(($dateOfBirth) => {
            const defaultValue = $dateOfBirth.prop('value')
            return defaultValue
        }).then((defaultValue) => {
            expect(defaultValue).to.equal('1975-10-25')
        })

        //Make sure date of death is blank
        cy.get('[data-cy=author_update_date_of_death]').then(($dateOfDeath) => {
            const defaultValue = $dateOfDeath.prop('valueAsDate')
            return defaultValue
        }).then((defaultValue) => {
            expect(defaultValue).to.equal(null)
        })

        //update the Zadie Smith entry to have new values
        cy.findByRole('textbox', {
            name: /first name/i
        }).clear().type('Agatha')
        
        cy.findByRole('textbox', {
            name: /family name/i
        }).clear().type('Christie')

        cy.findByLabelText(/date of birth/i).type('1890-09-15')

        cy.findByLabelText(/date of death/i).type('1976-01-12')

        cy.findByRole('button', {
            name: /update author/i
        }).click()

        // Make sure AuthorList no longer includes Zadie Smith and does include Agatha Christie
        cy.get('[data-cy=author_list]')
            .should('not.contain', 'Smith, Zadie')
            .should('contain', 'Christie, Agatha')
            .should('contain', 'Born: 09-15-1890')
            .should('contain', 'Died: 01-12-1976')
    })
})