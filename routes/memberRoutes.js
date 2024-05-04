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

// Endpoint untuk memperbarui informasi anggota berdasarkan ID
router.put('/:memberId', async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.memberId, req.body, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk memperbarui informasi anggota sebagian berdasarkan ID
router.patch('/:memberId', async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.memberId, req.body, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk menghapus anggota berdasarkan ID
router.delete('/:memberId', async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.memberId);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
