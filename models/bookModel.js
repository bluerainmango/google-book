const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A book must have a title"],
      trim: true,
      maxlength: [
        400,
        "A book title must have less or equal than 100 characters",
      ],
    },
    authors: [String],
    description: { type: String, trim: true },
    image: String,
    link: { type: String, trim: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
