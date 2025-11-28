const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const usersRoute = require('../back/routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const mongoose = require('mongoose');

app.get('/testing', (req, res) => {
  res.send('Testing endpoint is working!');
});

app.use('/', usersRoute);


mongoose.connect('mongodb://localhost:27017/bioscanD')
  .then(() => console.log('🟢 Connected to MongoDB'))
  .catch((err) => console.error('🔴 MongoDB connection error:', err));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = app;