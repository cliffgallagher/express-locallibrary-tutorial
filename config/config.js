require('dotenv').config();

module.exports = {
    "development": {
      "username": process.env.MYSQL_USERNAME,
      "password": process.env.MYSQL_PASSWORD,
      "database": process.env.MYSQL_SCHEMA_NAME,
      /*"username": "root",
      "password": "JosieOvechkin89!",
      "database": "local_library",*/
      "host": "127.0.0.1",
      "dialect": "mysql",
      "seederStorage": "sequelize"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
};