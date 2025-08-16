// app.js
const express = require('express');
const cors = require('cors');
const superheroRoutes = require('./routes/superheroRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use('/superheroes', superheroRoutes);

app.get('/', (req, res) => {
  res.send('Backend працює!');
});

module.exports = app;