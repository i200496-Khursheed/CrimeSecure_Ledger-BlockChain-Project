//citizenRoutes.js
const express = require('express')
const {
    getCrimes,
    getCrime,
} = require('../controllers/citizenController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all crime routes
router.use(requireAuth)

router.get('/', getCrimes)

router.get('/:id', getCrime)

module.exports = router