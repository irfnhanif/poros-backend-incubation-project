module.exports = {
  HOST: "mysql",
  USER: "root",
  PASSWORD: "secret",
  DB: "books",
  dialect: "mysql",
  timezone: "+07:00",
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
};
