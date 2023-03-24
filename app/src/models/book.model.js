const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.BOOLEAN,
    },
    publisher: {
      type: DataTypes.STRING,
    },
    yearPublished: {
      type: DataTypes.INTEGER,
      field: "year_published",
    },
    totalPage: {
      type: DataTypes.INTEGER,
      field: "total_page",
    },
    currentPage: {
      type: DataTypes.INTEGER,
      field: "current_page",
    },
    bookStatus: {
      type: DataTypes.ENUM("Sedang dibaca", "Selesai dibaca"),
      field: "book_status",
      defaultValue: "Sedang dibaca",
    },
  });

  return Book;
};
