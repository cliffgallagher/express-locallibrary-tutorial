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
    await queryInterface.bulkInsert('bookinstances', [{
      book_id: 6,
      imprint: 'London Gollancz, 2014.',
      status: "Available",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      book_id: 7,
      imprint: 'Gollancz, 2011.',
      status: "Loaned",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      book_id: 8,
      imprint: "Gollancz, 2015",
      status: "Available",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      book_id: 9,
      imprint: 'New York Tom Doherty Associates, 2016.',
      status: "Available",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      book_id: 9,
      imprint: 'New York Tom Doherty Associates, 2016.',
      status: "Available",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      book_id: 9,
      imprint: 'New York Tom Doherty Associates, 2016.',
      status: "Available",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      book_id: 10,
      imprint: 'New York, NY Tom Doherty Associates, LLC, 2015.',
      status: "Available",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      book_id: 10,
      imprint: 'New York, NY Tom Doherty Associates, LLC, 2015.',
      status: "Maintenance",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      book_id: 10,
      imprint: 'New York, NY Tom Doherty Associates, LLC, 2015.',
      status: "Loaned",
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

     await queryInterface.bulkDelete('bookinstances', null, {});
  }
};
