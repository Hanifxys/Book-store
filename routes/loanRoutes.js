const express = require('express');
const router = express.Router();
const Loan = require('../models/loan');
const LoanController = require('../controllers/loansController');

// Endpoint untuk membuat pinjaman baru
router.post('/', async (req, res) => {
  const loan = new Loan({
    LoanID: req.body.LoanID,
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

// Endpoint untuk memperbarui informasi pinjaman berdasarkan ID
router.put('/:loanId', async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.loanId, req.body, { new: true });
    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(updatedLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk memperbarui informasi pinjaman sebagian berdasarkan ID
router.patch('/:loanId', async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.loanId, req.body, { new: true });
    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(updatedLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk menghapus pinjaman berdasarkan ID
router.delete('/:loanId', async (req, res) => {
  try {
    const deletedLoan = await Loan.findByIdAndDelete(req.params.loanId);
    if (!deletedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json({ message: 'Loan deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
