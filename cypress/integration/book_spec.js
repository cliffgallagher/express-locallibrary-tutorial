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
  * gets duplicate warning but adds second copy
  */
  it.only('gets duplicate warning when adding a duplicate book, and does add new book by clicking "yes" on warning', () => {
    
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

})