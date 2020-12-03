const Dealer = require("../models/dealer.model");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports.getDealers = function(req,res,next){
    Dealer.find({})
        .select('_id name email phone role description')
        .exec()
        .then(result => {
        if(result.length>0){
            res.status(203).json({
                totalDealers : result.length,
                farmers:result
            })
        } else {
            res.status(500).json({
                message:'No farmers registered yet',
                method:'POST',
                url:'http://localhost:3000/dealer/signup'
            })
        }
    }).catch(err => {
        res.status(500).json({ error: "Something Went Wrong" });
    });
}


module.exports.getDealerProfile = function (req, res, next) {
  Dealer.findById(req.params.id)
    .select("name email phone description _id")
    .then((data) => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(404).json({ error: "Cannot find profile with that ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Something Went Wrong" });
    });
}

module.exports.dealerSignUp = function (req, res, next) {
  const { name, email, phone, password, description, role, bank_details, payment_details } = req.body;

  Dealer.find({ email: email })
    .exec()
    .then((dealer) => {
      if (dealer.length >= 1) {
        return res.status(422).json({ message: "Email Already Exists" });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            const dealer = new Dealer({
              name: name,
              email: email,
              phone: phone,
              password: hash,
              description: description,
              role:role,
              bank_details:bank_details,
              payment_details:payment_details
            });

            dealer
              .save()
              .then((dealer) => {
                res.status(201).json(dealer);
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
}


module.exports.dealerSignIn = function (req, res, next) {
  Dealer.findOne({ email: req.body.email })
    .exec()
    .then((dealer) => {
        // if(!dealer){
        //     return res.status(401).json({
        //         error: "Auth Failed",
        //       });
        // }
        console.log(dealer);
        bcrypt.compare(req.body.password, dealer.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              error: "Auth Failed",
            });
          }
          if (result) {

            const payload = {
              id:dealer._id,
              email:dealer.email,
              role:dealer.role
            }

            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "300s" })

            return res.status(200).json({
              message: "Auth Successful",
              token
            });
            // const url = 'http://localhost:3003/auth';
            // const payload = {
            //     id:dealer._id,
            //     email:dealer.email,
            //     role:dealer.role
            // }
            
            // axios.post(url,payload)
            //      .then(response=>console.log(response.data))
            //      .catch(err=> console.log('error occured'))
          }
          return res.status(401).json({
            error: "Auth Failed",
          });
        });
      }).catch(()=> {
        res.status(401).json({
            error: "Auth Failed",
            err
          });
      }) 
}

module.exports.deleteDealerProfile = function (req, res, next) {
  const id = req.params.id;

  Dealer.findOneAndDelete({ _id: id })
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "Deleted Dealer Profile",
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// module.exports.verifyToken = function (req, res, next) {
//   const url = "http://localhost:3003/auth/verify";
//   const payload = {
//     token: req.headers.authorization,
//   };
//   console.log(payload);
//   if (payload.token !== undefined) {
//     axios
//       .post(url, payload)
//       .then((response) => {
//         console.log(response.data);
//         if (response.data) {
//           if (response.data.id === req.params.id) {
//             next();
//           } else {
//             res
//               .status(401)
//               .json({ message: "You are Unauthorized to view this profile" });
//           }
//         } else {
//           res.status(401).json({ message: "Unauthorized" });
//         }
//       })
//       .catch((err) => console.log(err));
//   } else {
//     res.status(404).json({ message: "No Token Found" });
//   }
// };