const express = require('express');
const app = express();
const mongoose = require('./database/db'); // Menyertakan koneksi ke MongoDB

// Middleware
app.use(express.json());

// Routes
try {
  const loanRoutes = require('./routes/loanRoutes');
  app.use('/loans', loanRoutes);
} catch (error) {
  console.error('Error loading loanRoutes:', error.message);
}

try {
  const reservationRoutes = require('./routes/reservationRoutes');
  app.use('/reservations', reservationRoutes);
} catch (error) {
  console.error('Error loading reservationRoutes:', error.message);
}

try {
  const memberRoutes = require('./routes/memberRoutes');
  app.use('/members', memberRoutes);
} catch (error) {
  console.error('Error loading memberRoutes:', error.message);
}

try {
  const bookRoutes = require('./routes/bookRoutes');
  app.use('/books', bookRoutes);
} catch (error) {
  console.error('Error loading bookRoutes:', error.message);
}
// Middleware untuk penanganan 404
app.use((req, res, next) => {
    res.status(404).send('404 - Not Found');
  });
  

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
