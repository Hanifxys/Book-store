const Reservation = require('./models/Reservation');

// Function to handle GET request for all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle GET request for a specific reservation by ReservationID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle POST request to create a new reservation
exports.createReservation = async (req, res) => {
  const reservation = new Reservation({
    MemberID: req.body.MemberID,
    ISBN: req.body.ISBN,
    ReservationDate: req.body.ReservationDate,
    Status: req.body.Status
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to handle DELETE request to delete a reservation by ReservationID
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    await reservation.remove();
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
