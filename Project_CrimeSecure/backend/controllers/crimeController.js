//crimeController.js
const Crime = require('../models/crimeModel') //crime model
const mongoose = require('mongoose')

// get all crimes
const getCrimes = async (req, res) => {
    const allCrimes = await Crime.find().sort({createdAt: -1})
    res.status(200).json(allCrimes)
}


// get a single Crime
const getCrime = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'No Crime Records!'})
    }

    const singleCrime = await Crime.findById(id)

    if (!singleCrime) 
    {
        return res.status(404).json({error: 'No Crime Records!'})
    }

    res.status(200).json(singleCrime)
}


// create a crime
const createCrime = async (req,res) => {
    const {name, crime, age, status, image} = req.body
  
    // add doc to db
    try {
      const user_id = req.user._id
      const admin_id = '655b74e6658af8277cf874ed'
      const newCrime = await Crime.create({name, crime, age, status, image, user_id, admin_id})
      res.status(200).json(newCrime)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  // update crime
  const updateCrime = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Crime Records!'})
    }

    try {
        const existingCrime = await Crime.findById(id)

        if (!existingCrime) {
            return res.status(404).json({error: 'No Crime Records!'})
        }

        if(existingCrime.admin_id.toString() === req.user._id.toString() || existingCrime.user_id.toString() === req.user._id.toString()){
            const updatedCrime = await Crime.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(updatedCrime)
        }
        
        else{
            if(req.user.email === "admin@admin.crimesecure.com")
            {
                const updatedCrime = await Crime.findByIdAndUpdate(id, req.body, {new: true})
                res.status(200).json(updatedCrime)
            }
            else
            {
                return res.status(403).json({error: 'You are not authorized to update the Crime'})
            }   
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteCrime = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Crime Records!' })
    }

    try {
        const crime = await Crime.findById(id)

        if (!crime) {
            return res.status(404).json({ error: 'No Crime Records!' })
        }

        if (crime.admin_id.toString() === req.user._id.toString() || crime.user_id.toString() === req.user._id.toString()
            || req.user.email === 'admin@admin.crimesecure.com') {
            const deletedCrime = await Crime.findByIdAndDelete(id)
            res.status(200).json(deletedCrime)
        } else {
            return res.status(403).json({ error: 'You are not authorized to delete the Crime' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createCrime,
    getCrimes,
    getCrime,
    deleteCrime,
    updateCrime,
}