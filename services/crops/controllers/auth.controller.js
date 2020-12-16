require('dotenv').config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();


module.exports.validateToken = function (req,res,next) {
  
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token === null) return res.sendStatus(401)
  
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,userdata) => {
      if(err) return res.sendStatus(403)
      req.user = userdata
      //console.log(req.user)
      next()
  });
}

module.exports.isValidUser = function(req,res,next) {
    if(req.user.role ==='farmer' || req.user.role === 'admin'){
        next()
    }else{
        return res.status(401).json({error:'Not Permitted'})
    }
}

module.exports.isAdmin = function(req,res,next){
    if(req.user.role ==='admin'){
        next()
    } else {
        return res.status(401).json({error:'Admin Privilege needed'});
    }
}

module.exports.isDealer = function(req,res,next){
    if(req.user.role ==='dealer'){
        next()
    } else {
        return res.status(401).json({error:'Not a Dealer Account'});
    }
}




