import { forEach } from "async"

describe('book_spec', () => {
  beforeEach(() => {

      cy.task('db:reset')
      
      cy.request('POST', 'users/login', {
          loginUsername: 'cliffgallagher',
          loginPassword: 'MyPassw0rd!',
          escapedUsername: 'cliffgallagher'.replaceAll('\'', '\\\''),
      })
      cy.wait(1000)
  })

  /*
  *
  * can add a new book
  */
  it('can add a new book', () => {
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
  
  /*
  *
  * gets duplicate warning and declines to add new book
  */
  it('gets duplicate warning when adding a duplicate book, does not add new book when click "no" on warning', () => {
    
    //create first book
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

    //Create the duplicate book
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
    
    //test that the warning popped up
    cy.get('[data-cy=duplicate_book_warning]').should('exist')

    //click no on the duplicate warning
    cy.findByRole('button', {
      name: /no/i
    }).click()

    //check that the warning went away and there is still only one instance of Pachinko in database
    cy.get('[data-cy=duplicate_book_warning]').should('not.exist')

    //return array of titles
    cy.get('[data-cy=book_info_title]').then(($element) => {

      const titles = $element.map((i, el) => {
        return Cypress.$(el).prop('innerHTML')
      })

      expect(titles.get().filter(el => el === "Title: Pachinko")).to.have.length(1)
    })
  })

  /*
  *
  * gets duplicate warning and adds second and third copies
  */
  it('adds three copies of Pachinko, then deletes one', () => {
    
    //create first book
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

    //Create the duplicate book
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
    
    //test that the warning popped up
    cy.get('[data-cy=duplicate_book_warning]').should('exist')

    //click yes on the duplicate warning
    cy.findByRole('button', {
      name: /yes/i
    }).click()

    cy.wait(1000)

    //check that the warning went away and there are two instances of Pachinko in database
    cy.get('[data-cy=duplicate_book_warning]').should('not.exist')

    //return array of titles
    cy.get('[data-cy=book_info_title]').then(($element) => {

      const titles = $element.map((i, el) => {
        return Cypress.$(el).prop('innerHTML')
      })
      cy.log(titles)

      expect(titles.get().filter(el => el === "Title: Pachinko")).to.have.length(2)
    })

    //Create another duplicate book
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
    
    //test that the warning popped up
    cy.get('[data-cy=duplicate_book_warning]').should('exist')

    //click yes on the duplicate warning
    cy.findByRole('button', {
      name: /yes/i
    }).click()

    cy.wait(1000)

    //check that the warning went away and there are three instances of Pachinko in database
    cy.get('[data-cy=duplicate_book_warning]').should('not.exist')

    //return array of titles
    cy.get('[data-cy=book_info_title]').then(($element) => {

      const titles = $element.map((i, el) => {
        return Cypress.$(el).prop('innerHTML')
      })
      cy.log(titles)

      expect(titles.get().filter(el => el === "Title: Pachinko")).to.have.length(3)
    })

    //Delete one book, check that there are now two copies of Pachinko
    cy.contains('Pachinko').click()

    cy.findByRole('button', {
      name: /delete/i
    }).click()

    cy.findByRole('button', {
      name: /delete/i
    }).click()

    cy.wait(1000)

    //check that the warning went away and there are two instances of Pachinko in database
    cy.get('[data-cy=duplicate_book_warning]').should('not.exist')

    //return array of titles
    cy.get('[data-cy=book_info_title]').then(($element) => {

      const titles = $element.map((i, el) => {
        return Cypress.$(el).prop('innerHTML')
      })
      cy.log(titles)

      expect(titles.get().filter(el => el === "Title: Pachinko")).to.have.length(2)
    })
  })

  it('triggers validation warnings on NewBookForm', () => {
    cy.visit('/')
    cy.findByRole('button', {
      name: /add new book/i
    }).click()
    cy.findByRole('button', {
      name: /submit/i
    }).click()
    cy.get('ul')
      .should('contain', 'Title cannot be blank')
      .should('contain', 'Summary must be between 1 and 250 characters.')
      .should('contain', 'Must pick an author.')
      .should('contain', 'Must pick a genre.')
    cy.findByRole('textbox', {
      name: /isbn/i
    }).type('123')
    cy.findByRole('button', {
      name: /submit/i
    }).click()
    cy.get('ul')
      .should('contain', 'ISBN must be 0, 10 or 13 numbers long')
  })

  it.only('can update books without triggering a Duplicate warning, if book has a unique title', () => {
    cy.visit('/')
    cy.contains('Metamorphosis').click()

    cy.findByRole('button', {
      name: /update/i
    }).click()

    cy.wait(1000)
    
    //Make sure BookUpdateForm populates with correct fields
    //Make sure title equals "Metamorphosis"
    cy.get('[data-cy=book_update_title_field]').then(($titleInput) => {
      const defaultValue = $titleInput.prop('value')
      return defaultValue
    }).then((defaultValue) => {
      cy.log(defaultValue)
      expect(defaultValue).to.equal('Metamorphosis')
    })

    //Make sure author is Franz Kafka
    cy.get('[data-cy=book_update_author_field]').then(($authorInput) => {
      const defaultValue = $authorInput.prop('value')
      return defaultValue
    }).then((defaultValue) => {
      expect(defaultValue).to.equal('96')
    })

    //Make sure ISBN is 9781557427663
    cy.get('[data-cy=book_update_isbn_field]').then(($isbnInput) => {
      const defaultValue = $isbnInput.prop('value')
      return defaultValue
    }).then((defaultValue) => {
      //cy.log(defaultValue)
      expect(defaultValue).to.equal('9781557427663')
    })

    //Make sure genre is Fiction
    cy.get('[data-cy=book_update_genre_field]').then(($genreInput) => {
      const defaultValue = $genreInput.prop('value')
      return defaultValue
    }).then((defaultValue) => {
      expect(defaultValue).to.equal('47')
    })

    //Make sure summary is accurate
    cy.get('[data-cy=book_update_summary_field]').then(($summaryInput) => {
      const defaultValue = $summaryInput.prop('value')
      return defaultValue
    }).then((defaultValue) => {
      expect(defaultValue).to.equal('A man turns into a fly.')
    })
  })

})