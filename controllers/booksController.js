const Book = require('../models/book');

// Function to handle GET request for all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle GET request for a specific book by ISBN
const getBookByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({ ISBN: req.params.isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Memeriksa status buku berdasarkan ISBN
const getBookStatus = async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await Book.findOne({ ISBN: isbn });
        if (!book) {
            res.status(404).json({ message: 'Buku tidak ditemukan' });
            return;
        }
        const status = book.AvailableCopies > 0 ? 'Ready' : 'On Loan';
        res.json({ status: status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to handle POST request to create a new book
const createBook = async (req, res) => {
  const book = new Book({
    ISBN: req.body.ISBN,
    Title: req.body.Title,
    Author: req.body.Author,
    Category: req.body.Category,
    PublishYear: req.body.PublishYear,
    Publisher: req.body.Publisher,
    AvailableCopies: req.body.AvailableCopies
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to handle DELETE request to delete a book by ISBN
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({ ISBN: req.params.isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.remove();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBooks, getBookByISBN, getBookStatus, createBook, deleteBook };
