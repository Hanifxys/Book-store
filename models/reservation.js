// models/reservation.js
const mongoose = require('mongoose');

// Mendefinisikan skema untuk koleksi Reservations
const reservationSchema = new mongoose.Schema({
  ReservationID: { type: String, required: true },
  MemberID: { type: String, required: true },
  ISBN: { type: String, required: true },
  ReservationDate: { type: Date, required: true },
  Status: { type: String, enum: ['Active', 'Fulfilled', 'Cancelled'], required: true }
});

// Membuat model dari skema
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
