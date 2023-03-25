const Sequelize = require("sequelize");
const dbConfig = require("../config/database.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: true,
  },
  operatorsAliases: false,
  timezone: dbConfig.timezone,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};

module.exports = db;
