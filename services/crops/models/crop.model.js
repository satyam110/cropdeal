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
        type: String
    },
    uploader:{
        type: String
    },
    imgUrl:{
        type: String
    },
    approved:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model('Crop', cropSchema );