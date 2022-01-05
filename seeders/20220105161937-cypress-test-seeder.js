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
      author_id: 34,
      summary: 'Winner of a Pulitzer in 2011, the book is a set of thirteen interrelated stories with a large set of characters all connected to Bennie Salazar, a record company executive, and his assistant, Sasha.',
      genre_id: 47,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Station Eleven',
      author_id: 75,
      summary: 'It takes place in the Great Lakes region before and after a fictional swine flu pandemic, known as the "Georgia Flu", has devastated the world, killing most of the population.',
      isbn: '9780804172448',
      genre_id: 47,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Metamorphosis',
      author_id: 96,
      summary: 'A man turns into a fly.',
      isbn: '',
      genre_id: 47,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'On Beauty',
      author_id: 71,
      summary: 'The story follows the lives of a mixed-race British/American family living in the U.S.',
      isbn: '',
      genre_id: 47,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'The Corrections: A Novel',
      author_id: 81,
      summary: 'The troubles of an elderly Midwestern couple and their three adult children, tracing their lives from the mid-20th century to "one last Christmas" together near the turn of the millennium.',
      isbn: '0312421273',
      genre_id: 47,
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
  }
};
