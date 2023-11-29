// index.js
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const crimeRoutes = require('./routes/crimeRoutes')
const userRoutes = require('./routes/userRoutes')
const citizenRoutes = require('./routes/citizenRoutes');

const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/crimeRoutes', crimeRoutes)
app.use('/api/citizenRoutes', citizenRoutes)
app.use('/api/userRoutes', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for server
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    });
  })
  .catch((error) => {
    console.log(error)
  });
