//crimeRoutes.js
const express = require('express')
const {
    createCrime, 
    getCrimes,
    getCrime,
    deleteCrime,
    updateCrime,
} = require('../controllers/crimeController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all Crime routes
router.use(requireAuth)

// GET all Crimes
router.get('/', getCrimes)

//GET a single Crime
router.get('/:id', getCrime)

// POST a new Crime
router.post('/', createCrime)

// DELETE a Crime
router.delete('/:id', deleteCrime)

// UPDATE a Crime
router.patch('/:id', updateCrime)

module.exports = router