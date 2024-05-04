const express = require('express');
const router = express.Router();
const Book = require('../models/book');


const BookController = require("../controllers/booksController");

// Endpoint untuk memeriksa status buku berdasarkan ISBN
// router.get('/status/:isbn', BookController.getBookStatus);

// Endpoint untuk mendapatkan semua data buku
router.get('/', BookController.getAllBooks);

// Endpoint untuk membuat buku baru
router.post('/', async (req, res) => {
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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint untuk mengubah data buku berdasarkan ISBN
router.put('/:isbn', async (req, res) => {
  const { isbn } = req.params;
  try {
    const updatedBook = await Book.findOneAndUpdate({ ISBN: isbn }, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint untuk memperbarui sebagian data buku berdasarkan ISBN
router.patch('/:isbn', async (req, res) => {
  const { isbn } = req.params;
  try {
    const updatedBook = await Book.findOneAndUpdate({ ISBN: isbn }, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint untuk menghapus buku berdasarkan ISBN
router.delete('/:isbn', async (req, res) => {
  const { isbn } = req.params;
  try {
    await Book.deleteOne({ ISBN: isbn });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
