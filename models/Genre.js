const { Sequelize, DataTypes } = require('sequelize');
const db = require("../config/database");

module.exports = db.define('Genre', {
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100]
        }
    }
});