const mongoose = require('mongoose');

// Mendefinisikan skema untuk koleksi Loans
const loanSchema = new mongoose.Schema({
  LoanID: { type: String, required: true },
  MemberID: { type: String, required: true },
  ISBN: { type: String, required: true },
  LoanDate: { type: Date, required: true },
  DueDate: { type: Date, required: true },
  ReturnDate: { type: Date },
  Fines: { type: Number }
});

// Membuat model dari skema
const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
