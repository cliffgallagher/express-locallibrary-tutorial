const { Sequelize } = require('sequelize');
module.exports = new Sequelize('local_library', 'root', 'JosieOvechkin89!', {
    dialect: 'mysql'
});