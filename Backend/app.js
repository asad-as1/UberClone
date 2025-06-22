const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('Welcome to the Uber Clone Backend!');
});

module.exports = app;