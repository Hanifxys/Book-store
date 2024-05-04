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

// Endpoint untuk memperbarui reservasi berdasarkan ID
router.put('/:reservationId', async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.reservationId, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk memperbarui sebagian reservasi berdasarkan ID
router.patch('/:reservationId', async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.reservationId, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk menghapus reservasi berdasarkan ID
router.delete('/:reservationId', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.reservationId);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
