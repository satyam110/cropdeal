const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    txn_id:{
        type:String
    },
    productName:{
        type: String,
        trim: true,
    },
    type:{
        type: String,
    },
    quantity:{
        type: Number,
    },
    totalCost:{
        type: Number
    },
    seller:{
        type: String
    },
    sellerName:{
        type: String
    },
    sellerEmail:{
        type: String
    },
    sellerPhone:{
        type: String
    },
    buyer:{
        type: String
    },
    buyerName:{
        type: String
    },
    buyerEmail:{
        type: String
    },
    buyerPhone:{
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model('Order', orderSchema);