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
    await queryInterface.bulkInsert('authors', [{
      first_name: 'Patrick',
      family_name: 'Rothfuss',
      date_of_birth: new Date(1973, 6, 6),
      date_of_death: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Ben',
      family_name: 'Bova',
      date_of_birth: new Date(1932, 11, 8),
      date_of_death: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Isaac',
      family_name: 'Asimov',
      date_of_birth: new Date(1920, 1, 2),
      date_of_death: new Date(1992, 4, 6),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Jim',
      family_name: 'Jones',
      date_of_birth: new Date(1971, 12, 16),
      date_of_death: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('authors', null, {});
  }
};
