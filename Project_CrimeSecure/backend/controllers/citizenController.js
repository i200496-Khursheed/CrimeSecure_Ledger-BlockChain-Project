//CitizenController.js
const Crime = require('../models/crimeModel') 
const mongoose = require('mongoose')

const getCrimes = async (req, res) => {
    const crimes = await Crime.find().sort({createdAt: -1})

    res.status(200).json(crimes)
}

const getCrime = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'No Crime Records!'})
    }

    const crime = await Crime.findById(id)

    if (!crime) 
    {
        return res.status(404).json({error: 'No Crime Records!'})
    }

    res.status(200).json(crime)
}

module.exports = {
    getCrimes,
    getCrime,
}