const mongoose = require('mongoose');
const { sendEmail } = require('../controllers/mail.controller');

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


orderSchema.post('save', (doc,next) => {
    const sellerMailData ={
        from: process.env.MAIL_ID,
        to: `${doc.sellerEmail}`,
        subject: 'CropDeal | Order Placed for '+doc.productName,
        text:  `Hello ${doc.sellerName}, Your product ${doc.productName} was purchased by ${doc.buyerName}. Below are the details,`,
        html: `<h2>Order Details</h2> <hr>
            <p>Buyer: ${doc.buyerName}</p>
            <p>Product: ${doc.productName}</p>
            <p>Quantity: ${doc.quantity}</p>
            <p>Total: ₹${doc.totalCost}</p>
            <h4>Please log in to portal to see purchase invoice</h4>
            <footer>CropDeal</footer>`
    }

    const buyerMailData ={
        from: process.env.MAIL_ID,
        to: `${doc.buyerEmail}`,
        subject: 'CropDeal | Order Placed for '+doc.productName,
        text:  `Hello ${doc.buyerName}, Your product ${doc.productName} was purchased by ${doc.buyerName}. Below are the details,`,
        html: `<h2>Purchase Order Details</h2> <hr>
            <p>Seller: ${doc.sellerName}</p>
            <p>Product: ${doc.productName}</p>
            <p>Quantity: ${doc.quantity}</p>
            <p>Total: ₹${doc.totalCost}</p>
            <h4>Please log in to portal to see purchase invoice</h4>
            <footer>CropDeal</footer>`
    }

    sendEmail(sellerMailData);
    sendEmail(buyerMailData);
    next();
})
module.exports = mongoose.model('Order', orderSchema);