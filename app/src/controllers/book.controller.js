const { where } = require("sequelize");
const Book = require("../models/book.model");

exports.create = async (req, res) => {
  if (!req.body || !req.body.title) {
    res.status(400).json({
      success: false,
      message: "Judul tidak boleh kosong!",
    });
  }

  const book = {
    title: req.body.title,
    genre: req.body.genre,
    author: req.body.author,
    publisher: req.body.publisher,
    yearPublished: Number(req.body.yearPublished),
    totalPage: Number(req.body.totalPage),
    currentPage: Number(req.body.currentPage),
    bookStatus:
      Number(req.body.currentPage) === Number(req.body.totalPage)
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

exports.findAll = (req, res) => {
  const book = Number(req.params);
  if (book !== undefined){
    res.status(200).json({
      success: true,
      data:{
        book,
      },
    })
  }
  const response = res.response({
    success : false,
    message: "Daftar Buku kosong",
  });
  response.code(404);
  return response;
};


exports.update = async (req, res) => {
  const bookId = Number(req.params.id);
  const book = await Book.findByPk(bookId);

  if (!book) {
    res.status(404).json({
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
    res.status(404).json({
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