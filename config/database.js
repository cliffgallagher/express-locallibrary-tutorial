const { Sequelize } = require('sequelize');
module.exports = new Sequelize(process.env.MYSQL_SCHEMA_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});