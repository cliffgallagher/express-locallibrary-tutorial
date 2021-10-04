const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('local_library', 'root', 'JosieOvechkin89!', {
    dialect: 'mysql'
});

module.exports = sequelize.define('Author', {
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
        type: DataTypes.DATE
    },
    date_of_death: {
        type: DataTypes.DATE
    }
}, {
    tableName: authors
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