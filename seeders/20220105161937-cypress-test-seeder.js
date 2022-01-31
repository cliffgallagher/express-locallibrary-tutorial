'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('books', [{
      title: 'A Visit From the Goon Squad',
<<<<<<< HEAD
      author_id: 1335,
      summary: 'Winner of a Pulitzer in 2011, the book is a set of thirteen interrelated stories with a large set of characters all connected to Bennie Salazar, a record company executive, and his assistant, Sasha.',
      isbn: '0307477479',
      genre_id: 554,
=======
      author_id: 1394,
      summary: 'Winner of a Pulitzer in 2011, the book is a set of thirteen interrelated stories with a large set of characters all connected to Bennie Salazar, a record company executive, and his assistant, Sasha.',
      isbn: '0307477479',
      genre_id: 592,
>>>>>>> integrating-google-analytics
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Station Eleven',
<<<<<<< HEAD
      author_id: 1340,
      summary: 'It takes place in the Great Lakes region before and after a fictional swine flu pandemic, known as the "Georgia Flu", has devastated the world, killing most of the population.',
      isbn: '9780804172448',
      genre_id: 554,
=======
      author_id: 1399,
      summary: 'It takes place in the Great Lakes region before and after a fictional swine flu pandemic, known as the "Georgia Flu", has devastated the world, killing most of the population.',
      isbn: '9780804172448',
      genre_id: 592,
>>>>>>> integrating-google-analytics
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Metamorphosis',
<<<<<<< HEAD
      author_id: 1337,
      summary: 'A man turns into a fly.',
      isbn: '9781557427663',
      genre_id: 554,
=======
      author_id: 1396,
      summary: 'A man turns into a fly.',
      isbn: '9781557427663',
      genre_id: 592,
>>>>>>> integrating-google-analytics
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'On Beauty',
<<<<<<< HEAD
      author_id: 1341,
      summary: 'The story follows the lives of a mixed-race British/American family living in the U.S.',
      isbn: '9780143037743',
      genre_id: 554,
=======
      author_id: 1400,
      summary: 'The story follows the lives of a mixed-race British/American family living in the U.S.',
      isbn: '9780143037743',
      genre_id: 592,
>>>>>>> integrating-google-analytics
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'The Corrections: A Novel',
<<<<<<< HEAD
      author_id: 1336,
      summary: 'The troubles of an elderly Midwestern couple and their three adult children, tracing their lives from the mid-20th century to "one last Christmas" together near the turn of the millennium.',
      isbn: '0312421273',
      genre_id: 554,
=======
      author_id: 1395,
      summary: 'The troubles of an elderly Midwestern couple and their three adult children, tracing their lives from the mid-20th century to "one last Christmas" together near the turn of the millennium.',
      isbn: '0312421273',
      genre_id: 592,
>>>>>>> integrating-google-analytics
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('books', null, {});
  }
};
