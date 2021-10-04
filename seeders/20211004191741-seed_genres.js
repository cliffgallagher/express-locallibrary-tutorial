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

    await queryInterface.bulkInsert('genres', [{
        name: "Fantasy",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Science Fiction",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "French Poetry",
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
     await queryInterface.bulkDelete('genres', null, {});
  }
};
