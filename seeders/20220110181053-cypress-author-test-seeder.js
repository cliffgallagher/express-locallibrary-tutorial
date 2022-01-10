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
      first_name: 'Jane',
      family_name: 'Austen',
      date_of_birth: new Date("1775-12-16"),
      date_of_death: new Date("1817-07-18"),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Jennifer',
      family_name: 'Egan',
      date_of_birth: new Date("1962-09-07"),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Jonathan',
      family_name: 'Franzen',
      date_of_birth: new Date("1959-08-17"),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Franz',
      family_name: 'Kafka',
      date_of_birth: new Date("1883-07-03"),
      date_of_death: new Date("1924-06-03"),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Jayne Ann',
      family_name: 'Krentz',
      date_of_birth: new Date("1948-03-28"),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Min Jin',
      family_name: 'Lee',
      date_of_birth: new Date("1968-11-11"),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Emily St. John',
      family_name: 'Mandel',
      date_of_birth: new Date("1979-01-10"),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Zadie',
      family_name: 'Smith',
      date_of_birth: new Date("1975-10-25"),
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

     await queryInterface.bulkDelete('authors', null, {});
  }
};
