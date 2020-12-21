const Order = require('../models/order.model')
const axios = require("axios");
const { sendEmail } = require('./mail.controller');
const stripe = require('stripe')('sk_test_51Hxrh3ADSPBvTAXQIHXYoR7dCy9QWy5owLLHXAZC5hFogHGxVIq0rBtB2713uZaL2zIpHhgrodJARZAXekX4jPrw00EghbLxn8')

/* STRIPE PAYMENT METHOD */
module.exports.stripePayment = function(req,res,next) {
  
    stripe.charges.create({
      amount: req.body.amount*100,
      currency: 'INR',
      description: 'Payment for Crop Purchase',
      source: req.body.token.id
    }, (err, charge)=>{
      if(err){
       next(err);
      }
      res.status(200).json({success:true, status:"Payment Successful", details:charge})
      const order = new Order({
        txn_id: charge.balance_transaction,
        productName: req.body.productName,
        type: req.body.type,
        quantity: req.body.quantity,
        totalCost: req.body.amount,
        seller: req.body.seller,
        sellerName: req.body.sellerName,
        sellerPhone: req.body.sellerPhone,
        sellerEmail: req.body.sellerEmail,
        buyer: req.body.buyer,
        buyerName: req.body.buyerName,
        buyerPhone: req.body.buyerPhone,
        buyerEmail: req.body.buyerEmail,
      });

      order.save()
           .then((data) => {
               //res.json(data)
               console.log(data);
               next()
           })
           .catch((err) => {
               console.log(err),
               next()
            })

    })

    // const mailData ={
    //     from: process.env.MAIL_ID,
    //     to: req.body.sellerEmail,
    //     subject: 'CropDeal | Order Placed for '+req.body.productName,
    //     text:  `Hello ${req.body.sellerName}, Your product ${req.body.productName} was purchased by ${req.body.buyerName}. Below are the details,`,
    //     html: `<h2>Order Details</h2> <hr>
    //         <p>Buyer: ${req.body.buyerName}</p>
    //         <p>Product: ${req.body.productName}</p>
    //         <p>Quantity: ${req.body.quantity}</p>
    //         <p>Total: ${req.body.amount}</p>
    //         <h4>Please log in to portal to see purchase invoice</h4>
    //         <footer>CropDeal</footer>`
    // }

    // sendEmail(mailData);
    console.log(req.body);
}

module.exports.getPaymentBySeller = function (req,res,next){
    const sellerId = req.params.sellerId;

    Order.find({ seller : sellerId })
         .then((order) => {
            if(order){
                res.status(201).json(order)
             } else {
                res.status(404).json({ error: "Cannot fetch entry with that ID" });
             }
         })
         .catch(err => {
             res.status(400).json({error:"Failed to fetch data"})
         })
}

module.exports.getPaymentByBuyer = function (req,res,next){
    const buyerId = req.params.buyerId;
    Order.find({ buyer : buyerId })
         .then((order) => {
             if(order){
                res.status(201).json(order)
             } else {
                res.status(404).json({ error: "Cannot fetch entry with that ID" });
             }
         })
         .catch(err => {
             res.status(400).json({error:"Failed to fetch data"})
         })
}

module.exports.getPayment = function(req,res,next){
    Order.find({})
         .then((order) => {
            if(order){
                res.status(201).json(order)
             } else {
                res.status(404).json({ error: "No data" });
             }
         })
         .catch(err => {
            res.status(400).json({error:"Failed to fetch data"})
        })
}

module.exports.getPaymentById = function(req,res,next){
    const id = req.params.id;
    Order.findById(id)
         .then((order) => {
            if(order){
                res.status(201).json(order)
             } else {
                res.status(404).json({ error: "Cannot fetch entry with that ID" });
             }
         })
         .catch(err => {
            res.status(400).json({error:"Failed to fetch data"})
        })
}