// testConnection.js
const mongoose = require('./db');

mongoose.connection
  .once('open', () => console.log('Connected to MongoDB'))
  .on('error', error => console.error('Error connecting to MongoDB:', error));
