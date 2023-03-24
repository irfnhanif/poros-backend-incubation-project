module.exports = {
  HOST: "172.19.0.2",
  USER: "root",
  PASSWORD: "secret",
  DB: "books",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
};
