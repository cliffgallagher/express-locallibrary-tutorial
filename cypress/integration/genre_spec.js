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
   * update a genre that will trigger a duplicate warning
   */
    it('can update a genre that will trigger a duplicate warning', () => {
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

    /*
   *
   * update a genre that will not trigger a duplicate warning
   */
    it('can update a genre that will not trigger a duplicate warning', () => {
        cy.contains('Fiction').click()

        cy.findByRole('button', {
                name: /update/i
        }).click()

        cy.findByRole('textbox', {
            name: /genre name/i
        }).clear().type('Young Adult')

        cy.findByRole('button', {
            name: /update/i
        }).click()

        cy.wait(1000)

        //warning should not appear
        cy.get('[data-cy=genre_popup_for_update]').should('not.exist')

        //GenreList should contain Young Adult, not contain Fiction
        cy.get('[data-cy=genre_list]').should('contain', 'Young Adult')

        cy.get('[data-cy=genre_info_name_field]').then(($element) => {

            const names = $element.map((i, el) => {
              return Cypress.$(el).prop('innerHTML')
            })
      
            expect(names.get().filter(el => el === "Fiction")).to.have.length(0)
        })
    })

    /*
    *
    * Create new genre with an apostrophe, update it to something else with an apostrophe, create a new book of this * genre, attempt to delete the genre to trigger the warning, delete the genre, then delete the book
    */
    it('can create a new genre with an apostrophe, update the name to something else with an apostrophe, create a new book of this genre, attempt to delete the book to trigger the warning, delete the genre, then delete the book', () => {

        /*
        * create a new genre with an apostrophe
        */
        cy.findByRole('button', {
            name: /add new genre/i
        }).click()
    
        cy.findByRole('textbox', {
            name: /new genre name/i
        }).type('Thri\'ller')
    
        cy.findByRole('button', {
            name: /submit genre/i
        }).click()

        cy.wait(1000)
    
        //GenreList should contain Thriller
        cy.get('[data-cy=genre_list]').should('contain', 'Thri\'ller')

        /*
        * update it to something else with an apostrophe
        */
        cy.contains('Thri\'ller').click()

        cy.findByRole('button', {
                name: /update/i
        }).click()

        cy.findByRole('textbox', {
            name: /genre name/i
        }).clear().type('You\'ng Adult')

        cy.findByRole('button', {
            name: /update/i
        }).click()

        cy.wait(1000)

        //warning should not appear
        cy.get('[data-cy=genre_popup_for_update]').should('not.exist')

        //GenreList should contain Young Adult, not contain Thri'ller
        cy.get('[data-cy=genre_list]').should('contain', 'You\'ng Adult')
        cy.get('[data-cy=genre_list]').should('not.contain', 'Thri\'ller')

        /*
        * Create a new book with this genre
        */
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/books/i).click()

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
          }).select('Austen, Jane')
        cy.findByRole('combobox', {
            name: /genre/i
          }).select('You\'ng Adult')
        cy.findByRole('button', {
            name: /submit/i
          }).click()
        cy.get('[data-cy=new_book_form]').should('not.exist')
        cy.get('[data-cy=booklist]').should('contain', 'You\'ng Adult')

        /*
        * Attempt to delete the genre
        */
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/genres/i).click()

        cy.contains('You\'ng Adult').click()
        
        cy.findByRole('button', {
            name: /delete/i
        }).click()

        cy.findByRole('button', {
            name: /delete/i
        }).click()

        //warning should appear
        cy.get('[data-cy=genre_popup_for_delete]').should('contain', 'You\'re attempting to delete the genre of a book currently stored in the database.')

        /*
        * delete the book first
        */
        cy.findByRole('button', {
            name: /close/i
        }).click()

        cy.findByRole('button', {
            name: /cancel/i
        }).click()

        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        
        cy.findByText(/books/i).click()
       
        cy.contains('You\'ng Adult').click()

        cy.findByRole('button', {
            name: /delete/i
        }).click()

        cy.findByRole('button', {
            name: /delete/i
        }).click()

        cy.wait(1000)

        cy.get('[data-cy=booklist]').should('not.contain', 'You\'ng Adult')

        /*
        * Delete the genre
        */
        cy.get('#root > div > div > div:nth-child(1) > svg').click()
        cy.findByText(/genres/i).click()

        cy.contains('You\'ng Adult').click()
        
        cy.findByRole('button', {
            name: /delete/i
        }).click()

        cy.findByRole('button', {
            name: /delete/i
        }).click()

        //You'ng Adult should not exist anymore
        cy.get('[data-cy=genre_list]').should('not.contain', 'You\'ng Adult')
    })

})