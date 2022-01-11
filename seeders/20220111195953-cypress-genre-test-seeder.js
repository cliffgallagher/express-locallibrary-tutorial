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
      name: 'Biography',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Cooking',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Fiction',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Historical Fiction',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Mystery',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Romance',
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
