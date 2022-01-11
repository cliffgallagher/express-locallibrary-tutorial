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
    it('can update an author that will not trigger a duplicate warning', () => {
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

        cy.wait(1000)

        // Make sure AuthorList no longer includes Zadie Smith and does include Agatha Christie
        cy.get('[data-cy=author_list]')
            .should('not.contain', 'Smith, Zadie')
            .should('contain', 'Christie, Agatha')
            .should('contain', 'Born: 09-15-1890')
            .should('contain', 'Died: 01-12-1976')
    })

    /*
    *
    *   update an author that will trigger a duplicate warning, and add the author
    */
    it('will trigger a duplicate author warning, but can add the author if the user wants', () => {
        cy.contains('Smith, Zadie').click()

        cy.findByRole('button', {
            name: /update/i
          }).click()

        cy.findByRole('textbox', {
            name: /first name/i
        }).clear().type('Min Jin')
        
        cy.findByRole('textbox', {
            name: /family name/i
        }).clear().type('Lee')

        cy.findByLabelText(/date of birth/i).type('1890-09-15')

        cy.findByRole('button', {
            name: /update author/i
        }).click()

        cy.wait(1000)

        //duplicate warning should appear
        cy.get('[data-cy=author_popup_for_update]').should('contain', 'An author named Min Jin Lee already exists in the database. Are you sure you want to update this author to have that name?')

        cy.findByRole('button', {
            name: /update/i
        }).click()

        cy.wait(1000)

        //check that there are two Min Jin Lees in the database now
        cy.get('[data-cy=author_info_name_field]').then(($element) => {

            const names = $element.map((i, el) => {
              return Cypress.$(el).prop('innerHTML')
            })
            cy.log(names)
      
            expect(names.get().filter(el => el === "Lee, Min Jin")).to.have.length(2)
            expect(names.get().filter(el => el === "Smith, Zadie")).to.have.length(0)
        })
    })

    /*
    *
    *   update an author that will trigger a duplicate warning, decline to add author
    */
    it('will trigger a duplicate author warning, declining to add duplicate will not add duplicate', () => {
        cy.contains('Smith, Zadie').click()

        cy.findByRole('button', {
            name: /update/i
          }).click()

        cy.findByRole('textbox', {
            name: /first name/i
        }).clear().type('Min Jin')
        
        cy.findByRole('textbox', {
            name: /family name/i
        }).clear().type('Lee')

        cy.findByLabelText(/date of birth/i).type('1890-09-15')

        cy.findByRole('button', {
            name: /update author/i
        }).click()

        cy.wait(1000)

        //duplicate warning should appear
        cy.get('[data-cy=author_popup_for_update]').should('contain', 'An author named Min Jin Lee already exists in the database. Are you sure you want to update this author to have that name?')

        cy.findByRole('button', {
            name: /cancel/i
        }).click()

        cy.findByRole('button', {
            name: /cancel/i
        }).click()

        cy.wait(1000)

        //check that there is only one Min Jin Lee in database, and one Zadie Smith
        cy.get('[data-cy=author_info_name_field]').then(($element) => {

            const names = $element.map((i, el) => {
              return Cypress.$(el).prop('innerHTML')
            })
            cy.log(names)
      
            expect(names.get().filter(el => el === "Lee, Min Jin")).to.have.length(1)
            expect(names.get().filter(el => el === "Smith, Zadie")).to.have.length(1)
        })
    })

    /*
    *
    *   Create an author who has apostrophe in their name, update author, create a book by that author, attempt to delete that author, delete the book, then delete the author
    */
    it.only('can create an author who has apostrophe in their name, update author, create a book by that author, attempt to delete that author, delete the book, then delete the author', () => {
        /*
        * Create the author
        */
        cy.findByRole('button', {
            name: /add new author/i
            }).click()
        
        cy.wait(1000)

        cy.get('[data-cy=new_author_form]').should('exist')

        cy.findByRole('textbox', {
            name: /first name/i
            }).type('Ni\'ck')
        cy.findByRole('textbox', {
            name: /family name/i
            }).type('Ho\'rnby')
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
                .to.contain('Ho\'rnby, Ni\'ck')
                .to.contain('Born: 04-17-1957')
        })

        /*
        * update the author
        */
        cy.contains('Ho\'rnby, Ni\'ck').click()

        cy.findByRole('button', {
            name: /update/i
        }).click()

        cy.findByRole('textbox', {
            name: /first name/i
        }).clear().type('Jo\'nah')
        
        cy.findByRole('textbox', {
            name: /family name/i
        }).clear().type('Hi\'ll')

        cy.findByLabelText(/date of birth/i).type('1890-09-15')

        cy.findByRole('button', {
            name: /update author/i
        }).click()

        cy.wait(1000)

        // Make sure AuthorList no longer includes Ni'ck Ho'rnby and does include Jo'nah Hill
        cy.get('[data-cy=author_list]')
        .should('not.contain', 'Ho\'rnby, Ni\'ck')
        .should('contain', 'Hi\'ll, Jo\'nah')
    })
})