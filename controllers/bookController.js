const Book = require("../models/bookModel");

exports.getAllbooks = async (req, res, next) => {
  let books = [];

  try {
    books = await Book.find();
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Error occurred while getting all books",
      items: null,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully got all books",
    items: books,
  });
};

exports.createBook = async (req, res, next) => {
  let newBook = {};

  try {
    newBook = await Book.create(req.body);
  } catch (err) {
    console.log("🚨 ERROR!", err);

    res.status(500).json({
      status: "Error",
      message: "Error occurred while creating a book",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    message: "successfully created a new book!",
    data: newBook,
  });
};

exports.deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log("🚨 ERROR!", err);

    res.status(500).json({
      status: "Error",
      message: `Error occurred while deleting a book: ${req.params.id}`,
    });
  }

  res.status(204).json({
    status: "success",
    message: `successfully deleted the book! ${req.params.id}`,
    data: null,
  });
};
