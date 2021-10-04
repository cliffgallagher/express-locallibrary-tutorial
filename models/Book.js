const { Sequelize, DataTypes } = require('sequelize');
const Author = require('./Author');
const Genre = require('./Genre');
const sequelize = new Sequelize('local_library', 'root', 'JosieOvechkin89!', {
    dialect: 'mysql'
});

module.exports = sequelize.define('Book', {
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
        allowNull: false,
        references: {
            model: Author,
            key: 'author_id'
        }
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genre,
            key: 'genre_id'
        }
    }
});

/*const test = async () => {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  sequelize.close();
};

test();*/