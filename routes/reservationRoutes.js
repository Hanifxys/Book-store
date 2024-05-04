// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// Endpoint untuk mendapatkan semua data reservasi
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint untuk membuat reservasi baru
router.post('/', async (req, res) => {
  const reservation = new Reservation({
    ReservationID: req.body.ReservationID,
    MemberID: req.body.MemberID,
    ISBN: req.body.ISBN,
    ReservationDate: req.body.ReservationDate,
    Status: req.body.Status
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// tambahkan endpoint lainnya sesuai kebutuhan

module.exports = router;
