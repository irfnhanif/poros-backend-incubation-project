const Joi = require("joi");
const { where } = require("sequelize");
const Book = require("../models/book.model");

exports.create = async (req, res) => {
  if (!req.body || !req.body.title) {
    return res.status(400).json({
      success: false,
      message: "Judul tidak boleh kosong!",
    });
  }

  const schema = Joi.object({
    title: Joi.string().required(),
    genre: Joi.string(),
    author: Joi.string(),
    publisher: Joi.string(),
    yearPublished: Joi.number(),
    totalPage: Joi.number(),
    currentPage: Joi.number(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const book = {
    title: value.title,
    genre: value.genre,
    author: value.author,
    publisher: value.publisher,
    yearPublished: Number(value.yearPublished),
    totalPage: Number(value.totalPage),
    currentPage: Number(value.currentPage),
    bookStatus:
      Number(value.currentPage) === Number(value.totalPage)
        ? "Selesai dibaca"
        : "Sedang dibaca",
  };

  try {
    const newBook = await Book.create(book);
    res.status(201).json({
      success: true,
      message: "Buku berhasil dimasukkan!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.findAll = async (req, res) => {
  const books = await Book.findAll();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Tidak ada buku!",
    });
  } else {
    try {
      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan buku!",
        data: books,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

exports.update = async (req, res) => {
  const bookId = Number(req.params.id);
  const book = await Book.findByPk(bookId);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Buku tidak ditemukan!",
    });
  }

  try {
    const keys = Object.keys(req.body);

    keys.forEach((key) => {
      if (
        key === "yearPublished" ||
        key === "totalPage" ||
        key === "currentPage"
      ) {
        book[key] = Number(req.body[key]);
      } else if (req.body[key]) {
        book[key] = req.body[key];
      }
    });

    if (book["currentPage"] === book["totalPage"]) {
      book["bookStatus"] = "Selesai dibaca";
    }

    await book.save();
    res.status(200).json({
      success: true,
      message: "Buku berhasil diperbarui!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const bookId = Number(req.params.id);
  const book = await Book.findByPk(bookId);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Buku tidak ditemukan!",
    });
  }

  try {
    await Book.destroy({ where: { id: bookId } });
    res.status(200).json({
      success: true,
      message: "Buku berhasil dihapus!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
