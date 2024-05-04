// routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const Loan = require('../models/loan');
const LoanController = require('../controllers/loansController');

// Endpoint untuk membuat pinjaman baru
router.post('/', async (req, res) => {
  const loan = new Loan({
    LoanID: req.body.LoanID, // Perbaikan disini
    MemberID: req.body.MemberID,
    ISBN: req.body.ISBN,
    LoanDate: req.body.LoanDate,
    DueDate: req.body.DueDate,
    ReturnDate: req.body.ReturnDate,
    Fines: req.body.Fines
  });

  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan peminjaman buku berdasarkan ID anggota
router.get('/:memberId', async (req, res) => {
  try {
    const loans = await LoanController.getLoansByMemberId(req.params.memberId);
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan peminjaman buku berdasarkan nama anggota
router.get('/memberByName/:memberName', async (req, res) => {
  try {
    const loans = await LoanController.getLoansByMemberName(req.params.memberName);
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan semua data pinjaman
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
