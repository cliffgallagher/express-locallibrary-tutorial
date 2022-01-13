describe('book_spec', () => {
  beforeEach(() => {

      cy.task('db:reset_books')
      
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
    cy.get('[data-cy=booklist]').should('contain', 'Pachinko')
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

  /*
  *
  * can update books without triggering a Duplicate warning, if book has a unique title
  */
  it('can update books without triggering a Duplicate warning, if book has a unique title', () => {
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
      expect(defaultValue).to.equal('1101')
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
      expect(defaultValue).to.equal('469')
    })

    //Make sure summary is accurate
    cy.get('[data-cy=book_update_summary_field]').then(($summaryInput) => {
      const defaultValue = $summaryInput.prop('value')
      return defaultValue
    }).then((defaultValue) => {
      expect(defaultValue).to.equal('A man turns into a fly.')
    })

    //Update the title to something that's not a duplicate
    cy.findByRole('textbox', {
      name: /title/i
    }).clear().type('The Metamorphosis')

    //Update the author to someone else
    cy.findByRole('combobox', {
      name: /author/i
    }).select('Mandel, Emily St. John')

    //Update the ISBN
    cy.findByRole('textbox', {
      name: /isbn/i
    }).clear().type('1234567890')

    //Update the genre
    cy.findByRole('combobox', {
      name: /genre/i
    }).select('Cooking')

    //Update the summary
    cy.findByRole('textbox', {
      name: /summary/i
    }).clear().type('This is the updated summary')

    //Click 'Update' and test that the updated values have been set
    cy.findByRole('button', {
      name: /update book/i
    }).click()

    cy.wait(1000)

    cy.contains('The Metamorphosis').click()

    // Expect the updated title to be "The Metamorphosis"

    // Expect ChosenBook to contain the updated values
    cy.get('[data-cy=chosen_book]').then(($chosenBook) => {
      expect($chosenBook)
        .to.contain('Title: The Metamorphosis')
        .to.contain('Author: Emily St. John Mandel')
        .to.contain('ISBN: 1234567890')
        .to.contain('Genre: Cooking')
        .to.contain('Summary: This is the updated summary')
    })
  })

  /*
  *
  * will trigger Duplicate warning if you update book with duplicate title
  */
  it.only('will trigger Duplicate warning if you update book with duplicate title, will update book if you click through warning', () => {
    cy.visit('/')
    cy.contains('Metamorphosis').click()

    cy.findByRole('button', {
      name: /update/i
    }).click()

    cy.wait(1000)

    //Update the title to something that is a duplicate
    cy.findByRole('textbox', {
      name: /title/i
    }).clear().type('On Beauty')

    //Update the author to someone else
    cy.findByRole('combobox', {
      name: /author/i
    }).select('Mandel, Emily St. John')

    //Update the ISBN
    cy.findByRole('textbox', {
      name: /isbn/i
    }).clear().type('1234567890')

    //Update the genre
    cy.findByRole('combobox', {
      name: /genre/i
    }).select('Cooking')

    //Update the summary
    cy.findByRole('textbox', {
      name: /summary/i
    }).clear().type('This is the updated summary')

    //Click 'Update' and test that the updated values have been set
    cy.findByRole('button', {
      name: /update book/i
    }).click()

    cy.wait(1000)

    cy.get('[data-cy=book_popup_for_update]').then(($html) => {
      expect($html).to.contain('A book with the title On Beauty already exists in the database. Are you sure you want to update this book to have that title?')
    })

    //click yes on the duplicate warning
    cy.findByRole('button', {
      name: /update/i
    }).click()

    cy.wait(1000)

    //Make sure there are two copies of On Beauty in the database
    cy.get('[data-cy=book_info_title]').then(($element) => {

      const titles = $element.map((i, el) => {
        return Cypress.$(el).prop('innerHTML')
      })
      cy.log(titles)

      expect(titles.get().filter(el => el === "Title: On Beauty")).to.have.length(2)
    })
  })

  /*
  *
  * will trigger Duplicate warning if you update book with duplicate title, will not update book if you click no on warning
  */
  it('will trigger Duplicate warning if you update book with duplicate title, will not update book if you click no on warning', () => {
    cy.visit('/')
    cy.contains('Metamorphosis').click()

    cy.findByRole('button', {
      name: /update/i
    }).click()

    cy.wait(1000)

    //Update the title to something that is a duplicate
    cy.findByRole('textbox', {
      name: /title/i
    }).clear().type('On Beauty')

    //Update the author to someone else
    cy.findByRole('combobox', {
      name: /author/i
    }).select('Mandel, Emily St. John')

    //Update the ISBN
    cy.findByRole('textbox', {
      name: /isbn/i
    }).clear().type('1234567890')

    //Update the genre
    cy.findByRole('combobox', {
      name: /genre/i
    }).select('Cooking')

    //Update the summary
    cy.findByRole('textbox', {
      name: /summary/i
    }).clear().type('This is the updated summary')

    //Click 'Update' and test that the updated values have been set
    cy.findByRole('button', {
      name: /update book/i
    }).click()

    cy.wait(1000)

    cy.get('[data-cy=book_popup_for_update]').then(($html) => {
      expect($html).to.contain('A book with the title On Beauty already exists in the database. Are you sure you want to update this book to have that title?')
    })

    //click cancel on the duplicate warning
    cy.findByRole('button', {
      name: /cancel/i
    }).click()

    cy.wait(1000)

    //Make sure there is only one copy of On Beauty in the database
    cy.get('[data-cy=book_info_title]').then(($element) => {

      const titles = $element.map((i, el) => {
        return Cypress.$(el).prop('innerHTML')
      })
      cy.log(titles)

      expect(titles.get().filter(el => el === "Title: On Beauty")).to.have.length(1)
    })
  })

  /*
  *
  * Delete a book
  */
  it('can delete a book', () => {
    cy.visit('/')
    cy.contains('A Visit From the Goon Squad').click()
  
    cy.findByRole('button', {
      name: /delete/i
    }).click()

    cy.wait(1000)
  
    cy.get('[data-cy=book_popup_for_delete]').then(($popupForDelete) => {
      expect($popupForDelete)
        .to.contain('Are you sure you want to delete this book?')
        .to.contain('Title: A Visit From the Goon Squad')
        .to.contain('Author: Jennifer Egan')
        .to.contain('ISBN: 0307477479')
    })

    cy.findByRole('button', {
      name: /delete/i
    }).click()

    cy.wait(1000)

    // make sure the book was deleted
    cy.get('[data-cy=book_info_title]').then(($element) => {

      const titles = $element.map((i, el) => {
        return Cypress.$(el).prop('innerHTML')
      })
      cy.log(titles)

      expect(titles.get().filter(el => el === "Title: A Visit From the Goon Squad")).to.have.length(0)
    })
  })
  
  /*
  *
  * add a new book that contains apostrophes
  */
  it('can add a new book that contains apostrophes', () => {
    cy.visit('/')
    cy.findByRole('button', {
        name: /add new book/i
      }).click()
    cy.findByRole('textbox', {
        name: /title/i
      }).type('Pach\'inko')
    cy.findByRole('textbox', {
        name: /isbn/i
      }).type('1455563927')
    cy.findByRole('textbox', {
        name: /summary/i
      }).type('Published in 2017, Pach\'inko is an epic historical fiction novel following a Korean family that immigrates to Japan.')
    cy.findByRole('combobox', {
        name: /author/i
      }).select('Lee, Min Jin')
    cy.findByRole('combobox', {
        name: /genre/i
      }).select('Fiction')
    cy.findByRole('button', {
        name: /submit/i
      }).click()

    cy.get('[data-cy=booklist')
      .should('contain', 'Title: Pach\'inko')
      .should('contain', 'Summary: Published in 2017, Pach\'inko is an epic historical fiction novel following a Korean family that immigrates to Japan.')
  })

  /*
  *
  * update a book to contain apostrophes, then delete the book
  */
  it('updates a book that contains apostrophes, then deletes it', () => {
    cy.visit('/')
    cy.contains('Metamorphosis').click()

    cy.findByRole('button', {
      name: /update/i
    }).click()

    cy.wait(1000)

    //Update the title to something that is a duplicate
    cy.findByRole('textbox', {
      name: /title/i
    }).clear().type('O\'n Beauty')

    //Update the author to someone else
    cy.findByRole('combobox', {
      name: /author/i
    }).select('Mandel, Emily St. John')

    //Update the ISBN
    cy.findByRole('textbox', {
      name: /isbn/i
    }).clear()

    //Update the genre
    cy.findByRole('combobox', {
      name: /genre/i
    }).select('Cooking')

    //Update the summary
    cy.findByRole('textbox', {
      name: /summary/i
    }).clear().type('This is the updated summary')

    cy.findByRole('button', {
      name: /update book/i
    }).click()

    cy.wait(1000)

    //Check that the book has been updated
    cy.get('[data-cy=booklist]')
      .should('contain', 'Title: O\'n Beauty')
      .should('contain', 'Author: Emily St. John Mandel')
      .should('contain', 'Genre: Cooking')
      .should('contain', 'ISBN: ')
      .should('contain', 'Summary: This is the updated summary')

    // Delete the book
    cy.contains('O\'n Beauty').click()
    cy.findByRole('button', {
      name: /delete/i
    }).click()

    cy.wait(1000)

    cy.get('[data-cy=book_popup_for_delete]').then(($popupForDelete) => {
      expect($popupForDelete)
        .to.contain('Are you sure you want to delete this book?')
        .to.contain('Title: O\'n Beauty')
        .to.contain('Author: Emily St. John Mandel')
        .to.contain('ISBN: ')
    })

    cy.findByRole('button', {
      name: /delete/i
    }).click()

    cy.wait(1000)

    // make sure the book was deleted
    cy.get('[data-cy=book_info_title]').then(($element) => {
      const titles = $element.map((i, el) => {
        return Cypress.$(el).prop('innerHTML')
      })
      cy.log(titles)

      expect(titles.get().filter(el => el === "Title: O\'n Beauty")).to.have.length(0)
    })  
  }) 
})