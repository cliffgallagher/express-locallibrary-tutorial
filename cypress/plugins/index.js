/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

 const shell = require('shell-exec');
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    'env': () => {
      return new Promise(resolve => {
        resolve(process.env);
      });
    },
    // relevant part
    'db:reset_books': () => {
      return shell('npx sequelize-cli db:seed:undo --seed 20220105161937-cypress-test-seeder.js && npx sequelize-cli db:seed --seed 20220105161937-cypress-test-seeder.js');
    },
    'db:reset_authors': () => {
      return shell('npx sequelize-cli db:seed:undo --seed 20220110181053-cypress-author-test-seeder.js && npx sequelize-cli db:seed --seed 20220110181053-cypress-author-test-seeder.js');
    },
    'db:reset_genres': () => {
      return shell('npx sequelize-cli db:seed:undo --seed 20220111195953-cypress-genre-test-seeder.js && npx sequelize-cli db:seed --seed 20220111195953-cypress-genre-test-seeder.js');
    }
  })
}
