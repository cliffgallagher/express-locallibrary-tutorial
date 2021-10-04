const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('local_library', 'root', 'JosieOvechkin89!', {
    dialect: 'mysql'
});

module.exports = sequelize.define('Genre', {
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
}, {
    tableName: genres
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