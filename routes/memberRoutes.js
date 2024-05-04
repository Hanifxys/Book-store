// routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// Endpoint untuk mendapatkan semua data anggota
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint untuk membuat anggota baru
router.post('/', async (req, res) => {
  const member = new Member({
    MemberID: req.body.MemberID,
    Name: req.body.Name,
    Address: req.body.Address,
    Email: req.body.Email,
    Phone: req.body.Phone,
    RegistrationDate: req.body.RegistrationDate
  });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;