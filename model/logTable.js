const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const logTable = sequelize.define("log_table", {
    ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    ds_descricao: {
        allowNull: true,
        type: Sequelize.STRING(200)
    },
    ds_objeto: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
    dataCriacao:{
        allowNull:true,
        type: 'TIMESTAMP'
    },
    json: {
        allowNull: true,
        type: Sequelize.STRING(1000)
    }
}, {
    timestamps: false, 
    freezeTableName: true,
});

module.exports = logTable;