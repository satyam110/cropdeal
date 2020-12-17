require('dotenv').config();
const Farmer = require("../models/farmerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// fetch all farmer details function
module.exports.getFarmers = function(req,res,next){
    Farmer.find({})
        .select('_id name email phone role description bank_details')
        .exec().then(result => {
        if(result){
            res.status(203).json(result)
        } else {
            res.status(500).json({
                message:'No farmers registered yet',
                method:'POST',
                url:'http://localhost:3000/farmer/signup'
            })
        }
    }).catch(err => {
        res.status(500).json({ error: "Something Went Wrong" });
    });
}


// fetch farmer profile function
module.exports.getFarmerProfile = function (req, res, next) {
  Farmer.findById(req.params.id)
    .select("name email phone description _id bank_details role")
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


// register farmer function
module.exports.farmerSignUp = function (req, res, next) {
  const { name, email, phone, password, description,role, bank_details } = req.body;

  Farmer.find({ email: email })
    .exec()
    .then((farmer) => {
      if (farmer.length >= 1) {
        return res.status(422).json({ message: "Email Already Exists" });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            const farmer = new Farmer({
              name: name,
              email: email,
              phone: phone,
              password: hash,
              description: description,
              role:role,
              bank_details:bank_details
            });

            farmer
              .save()
              .then((farmer) => {
                res.status(201).json(farmer);
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

// farmer sign in function
module.exports.farmerSignIn = function (req, res, next) {
  Farmer.findOne({ email: req.body.email })
    .exec()
    .then((farmer) => {
        //console.log(farmer);
        bcrypt.compare(req.body.password, farmer.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              error: "Auth Failed",
            });
          }
          if (result) {

            const userData = {
              id: farmer._id,
              email: farmer.email,
              role: farmer.role
            }

            const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
            return res.status(200).json({
              message: "Auth Successful",
              token,
              id: farmer._id,
              email: farmer.email,
              role: farmer.role
            });
            // const url = 'http://localhost:3003/auth';
            // const payload = {
            //     id:farmer._id,
            //     email:farmer.email,
            //     role:farmer.role
            // }

            // axios.post(url,payload)
            //      .then(response=>{
            //        console.log(response.data)
            //         return response.data.token;
            //       })
            //      .catch(err=> console.log('error occured'))
          }
          return res.status(401).json({
            error: "Auth Failed",
          });
        });
      }).catch(() => {
        res.status(401).json({
            error: "Auth Failed"
          });
      })  
}

module.exports.updateFarmerProfile = function (req,res,next) {
  const id = req.params.id;

  Farmer.findByIdAndUpdate(id,req.body)
        .exec()
        .then(() => {
          res.status(200).json({
            message:"Update Successful",
            method:"GET",
            url:"http://localhost:3000/farmer/profile/"+id
          })
        }).catch((err) => {
          res.status(404).json({
            error:err
          });
        });
}

// farmer profile deletion function
module.exports.deleteFarmerProfile = function (req, res, next) {
  const id = req.params.id;

  Farmer.findOneAndDelete({ _id: id })
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "Deleted Farmer Profile",
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}


// //token verification middleware
// module.exports.verifyToken = function (req, res, next) {
//   const url = "http://localhost:3003/auth/verify";
//   const payload = {
//     token: req.headers.authorization,
//   };
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
