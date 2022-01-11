describe('genre_spec', () => {
    beforeEach(() => {
  
        cy.task('db:reset_genres')
        
        cy.request('POST', 'users/login', {
            loginUsername: 'cliffgallagher',
            loginPassword: 'MyPassw0rd!',
            escapedUsername: 'cliffgallagher'.replaceAll('\'', '\\\''),
        })
        cy.wait(1000)

        cy.visit('/')
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/genres/i).click()
    })

    /*
    *
    * Can create a new genre
    */
    it('can create new genre', () => {
        cy.findByRole('button', {
            name: /add new genre/i
        }).click()
    
        cy.findByRole('textbox', {
            name: /new genre name/i
        }).type('Thriller')
    
        cy.findByRole('button', {
            name: /submit genre/i
        }).click()

        cy.wait(1000)
    
        //NewGenreForm should disappear
        cy.get('[data-cy=new_genre_form]').should('not.exist')
    
        //GenreList should contain Thriller
        cy.get('[data-cy=genre_list]').should('contain', 'Thriller')
    })

    /*
    *
    * trigger validation warning on NewGenreForm
    */
    it('can trigger validation warnings on NewGenreForm', () => {
        cy.findByRole('button', {
            name: /add new genre/i
        }).click()
    
        cy.findByRole('button', {
            name: /submit genre/i
        }).click()

        cy.wait(1000)

        cy.get('ul')
        .should('contain', 'Genre name cannot be empty')
    })

    /*
    *
    * creating new genre instance that is already in database triggers duplicate warning
    */
    it('can warn user if they are creating a duplicate genre', () => {
        cy.findByRole('button', {
            name: /add new genre/i
        }).click()

        cy.findByRole('textbox', {
            name: /new genre name/i
        }).type('Fiction')

        cy.findByRole('button', {
            name: /submit genre/i
        }).click()

        cy.wait(1000)

        cy.get('[data-cy=duplicate_genre_form]').should('exist')

        cy.findByRole('button', {
            name: /close/i
        }).click()

        cy.wait(1000)

        cy.get('[data-cy=duplicate_genre_form]').should('not.exist')
   })

   /*
   *
   * update a genre that won't trigger a duplicate warning
   */
    it.only('can update a genre that will not trigger a duplicate warning', () => {
        cy.contains('Fiction').click()

        cy.findByRole('button', {
                name: /update/i
        }).click()

        cy.findByRole('textbox', {
            name: /genre name/i
        }).clear().type('Mystery')

        cy.findByRole('button', {
            name: /update/i
        }).click()

        cy.wait(1000)

        //warning should appear
        cy.get('[data-cy=genre_popup_for_update]').should('contain', 'Genre name Mystery already exists in the database.')

        cy.findByRole('button', {
            name: /close/i
        }).click()

        cy.findByRole('button', {
            name: /cancel/i
        }).click()

        //element should not have updated. Fiction and Mystery should still exist in database
        cy.get('[data-cy=genre_list]').should('contain', 'Fiction')

        cy.get('[data-cy=genre_info_name_field]').then(($element) => {

            const names = $element.map((i, el) => {
              return Cypress.$(el).prop('innerHTML')
            })
            //cy.log(names)
      
            expect(names.get().filter(el => el === "Mystery")).to.have.length(1)
        })
    })

})