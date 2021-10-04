const { Sequelize, DataTypes } = require('sequelize');
const Book = require('./Book');
const sequelize = new Sequelize('local_library', 'root', 'JosieOvechkin89!', {
    dialect: 'mysql'
});

module.exports = sequelize.define('BookInstance', {
    book_instance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    book: {
        type: Book,
        allowNull: false,
        references: {
            model: Book,
            key: 'book_id'
        }
    },
    imprint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Available', 'Maintenance', 'Loaned', 'Reserved'), defaultValue: 'Maintenance',
        allowNull: false,
        due_back: {
            type: DataTypes.DATE, defaultValue: DataTypes.NOW
        }
    }
}, {
    tableName: book_instances
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