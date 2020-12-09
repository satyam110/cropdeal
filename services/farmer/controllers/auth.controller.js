require('dotenv').config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();


module.exports.validateToken = function (req,res,next) {
  
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token === null) return res.status(401).json({error:'Token Missing'})
  
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,userdata) => {
      if(err) return res.status(403).json({error:'Invalid Token'})
      req.user = userdata
      console.log(req.user)
      next()
  });
}

module.exports.isValidUser = function(req,res,next) {
    if(req.user.id === req.params.id || req.user.role === 'admin'){
        next()
    }else{
        return res.status(401).json({error:'Invalid User'})
    }
}
module.exports.isAdmin = function(req,res,next){
    if(req.user.role ==='admin'){
        next()
    } else {
        return res.status(401).json({error:'Admin Privilege needed'});
    }
}
module.exports.isCropService = function(req,res,next){
    if(req.headers['servicename'] === 'crop'){
        console.log(req.headers);
        next();
    }
}



