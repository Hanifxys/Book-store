const express = require('express');
const app = express();
const mongoose = require('./database/db'); // Menyertakan koneksi ke MongoDB
const loanRoutes = require('./routes/loanRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const memberRoutes = require('./routes/memberRoutes');
const bookRoutes = require('./routes/bookRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// Routes


  app.use('/loans', loanRoutes);
  app.use('/reservations', reservationRoutes);
  app.use('/members', memberRoutes);
  app.use('/books', bookRoutes);

// Middleware untuk penanganan 404
app.use((req, res, next) => {
    res.status(404).send('404 - Not Found');
  });


  

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
