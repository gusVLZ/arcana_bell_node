const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const logTable = sequelize.define("user", {
    ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        allowNull: true,
        type: Sequelize.STRING(50)
    },
    email: {
        allowNull: true,
        type: Sequelize.STRING(200)
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
    role: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    cargo: {
        allowNull: true,
        type: Sequelize.STRING(50)
    }
}, {
    timestamps: false, 
    freezeTableName: true,
});

module.exports = logTable;