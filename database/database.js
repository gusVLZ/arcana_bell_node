const Sequelize = require("sequelize");
const environment = process.env.NODE_ENV || "development";

const config = require("../config/config.js")[environment];

const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.dialect
    }
);

module.exports = sequelize;