// models/member.js
const mongoose = require('mongoose');

// Mendefinisikan skema untuk koleksi Members
const memberSchema = new mongoose.Schema({
  MemberID: { type: String, required: true },
  Name: { type: String, required: true },
  Address: { type: String, required: true },
  Email: { type: String, required: true },
  Phone: { type: String, required: true },
  RegistrationDate: { type: Date, required: true }
});

// Membuat model dari skema
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
