const { Sequelize, DataTypes } = require('sequelize');
const Author = require('./Author');
const Genre = require('./Genre');
const db = require("../config/database");

module.exports = db.define('Book', {
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summary: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});