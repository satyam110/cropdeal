const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    location:{
        type: String
    },
    cost:{
        type: Number
    },
    uploader:{
        type: mongoose.SchemaTypes.ObjectId
    }
})

module.exports = mongoose.model('Crop', cropSchema );