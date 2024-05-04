const Loan = require('../models/loan');

// Function to handle GET request for all loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle GET request for a specific loan by LoanID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle POST request to create a new loan
exports.createLoan = async (req, res) => {
  // Pengecekan jika req.body tidak kosong
  if (!req.body) {
    return res.status(400).json({ message: "Request body is empty" });
    

  }

  const loan = new Loan({
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
};



// Function to handle DELETE request to delete a loan by LoanID
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    await loan.remove();
    res.json({ message: 'Loan deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan peminjaman buku berdasarkan ID anggota
exports.getLoansByMemberId = async (req, res) => {
    const memberId = req.params.memberId;
    try {
        const loans = await Loan.find({ MemberID: memberId });
        res.json(loans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to handle GET request for loans by member name
exports.getLoansByMemberName = async (req, res) => {
    const memberName = req.params.memberName;
    try {
        const loans = await Loan.find({ MemberName: memberName });
        res.json(loans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

