// models/book.js
const mongoose = require('mongoose');

// Mendefinisikan skema untuk koleksi Books
const bookSchema = new mongoose.Schema({
  ISBN: { type: String, required: true },
  Title: { type: String, required: true },
  Author: { type: String, required: true },
  Category: { type: String, required: true },
  PublishYear: { type: Number, required: true },
  Publisher: { type: String, required: true },
  AvailableCopies: { type: Number, required: true }
});

// Membuat model dari skema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
