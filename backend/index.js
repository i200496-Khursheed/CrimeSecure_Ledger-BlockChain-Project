// index.js
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const crimeRoutes = require('./routes/crimeRoutes')
const userRoutes = require('./routes/userRoutes')
const citizenRoutes = require('./routes/citizenRoutes');
const { Block, Blockchain } = require('./blockchain/blockchain'); // Import both classes

const myBlockchain = new Blockchain(); // Change variable name here

const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// API endpoint to mine a new block when a crime record is added
app.post('/api/mineBlock', async (req, res) => {
  const { name, crime, age, status, image } = req.body;

  // Pass the criminalInfo to the mineBlock method
  const newBlock = myBlockchain.mineBlock(`${name}${crime}${age}${status}${image}`, { name, crime, age, status, image });

  // Send crime data to Ganache
  await crimeContract.methods.addCrime(name, crime, parseInt(age), status, image).send({ from: '0x8aE60485D23E02d67D8b068C7B499C86bfF63c7e' }); // Update with your Ganache account address

  res.status(200).json(newBlock);
});

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
