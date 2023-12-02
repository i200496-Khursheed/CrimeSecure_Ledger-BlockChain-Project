//crimeModel.js
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const crimeSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    crime: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        //type: String,
        required: true
      },

    admin_id:{
        type: String,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model('crimeSecure', crimeSchema)