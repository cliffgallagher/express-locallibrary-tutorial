const { Sequelize, DataTypes } = require('sequelize');
const db = require("../config/database");

module.exports = db.define('Author', {
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    family_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    date_of_birth: {
        type: DataTypes.DATEONLY
    },
    date_of_death: {
        type: DataTypes.DATEONLY
    }
});