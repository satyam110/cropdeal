const Crop = require("../models/crop.model");
const axios = require("axios");
//const stripe = require('stripe')('sk_test_51Hxrh3ADSPBvTAXQIHXYoR7dCy9QWy5owLLHXAZC5hFogHGxVIq0rBtB2713uZaL2zIpHhgrodJARZAXekX4jPrw00EghbLxn8')


module.exports.getCrops = function (req, res, next) {
  Crop.find({ approved: true })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ error: "Something Went Wrong",err });
    });
};

module.exports.getCropById = function (req, res, next) {

  Crop.findById(req.params.cropId)
    .then((crop) => {
      if (crop) {
        const { name, type, quantity, location, uploader, imgUrl, cost } = crop;
        
          const url = "http://localhost:3000/farmer/" + uploader;
          axios.get(url , {
              headers: {
              servicename: 'crop'
            }
          })
            .then((response) => {
              res.status(201).json({
                name,
                type,
                quantity,
                location,
                cost,
                uploader,
                imgUrl,
                farmerName: response.data.name,
                farmerPhone: response.data.phone,
                farmerEmail: response.data.email,
                description: response.data.description,
              });
            })
            .catch((err) => res.status(403).json({ error: err }));
        
      } else {
        res.status(404).json({ error: "Cannot fetch entry with that ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Something Went Wrong" });
    });
};


module.exports.getCropsFarmer = function (req,res,next) {
  Crop.find({uploader:req.params.farmerId})
      .then((crop)=>{
        if(crop){
          res.status(200).json(crop)
        }else{
          res.status(404).json({ error: "Cannot fetch entry with that ID" });
        }
      }).catch(()=>{
        res.status(500).json({ error: "Something Went Wrong" });
      })
}

module.exports.postCropDetails = function (req, res, next) {
  
  const url = req.protocol+'://'+req.get("host");
  const crop = new Crop({
    name: req.body.name,
    type: req.body.type,
    quantity: req.body.quantity,
    location: req.body.location,
    cost: req.body.cost,
    uploader: req.body.uploader,
    imgUrl: url+'/uploads/'+ req.file.filename
  });

  crop
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({error:'Something went wrong'})
    });
};

module.exports.updateCropDetails = function (req, res, next) {
  const id = req.params.cropId;
  // const name = req.params.name;
  // const type = req.params.type;
  // const quantity = req.params.quantity;
  // const location = req.body.location;
  // const uploader = req.body.uploader;
  Crop.findByIdAndUpdate(id, req.body)
    .exec()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Error updating crop details',
      });
    });
};

module.exports.deleteCropById = function (req, res, next) {
  const id = req.params.cropId;

  Crop.findOneAndDelete({ _id: id })
    .exec()
    .then((data) => {
      if(data){
        res.status(200).json(data);
      } else {
        res.status(404).json({error:"Cannot fetch entry with that ID"});
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};

module.exports.getCropsSubscribed = function (req,res,next) {
  const cropsSubscribed = req.body.cropsSubscribed;
  console.log(req.headers);
  Crop.find({ name : {$in: cropsSubscribed} })
      .then(crops => {
        res.status(200).send(crops)
      }).catch(err => {
        res.status(404).send({"error":err})
      })
}

module.exports.getCropsUnderReview = function(req,res,next){
  Crop.find({ approved: false })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ error: "Something Went Wrong" });
    });
}

module.exports.approveCrop = function(req,res,next){
  const id = req.params.id;
  Crop.findByIdAndUpdate(id,req.body)
      .exec()
      .then((data) => {
        res.status(201).json({message:"Updated Successfully"})
      })
      .catch((err) => {
        res.status(400).json({error: "Something Went Wrong",err});
      })
}

module.exports.getDistinctCropName = function(req,res,next){
  Crop.find()
      .distinct('name' , function (err, names){
        if(err){
          res.status(401).json({error: "something went wrong", err})
        }

        res.status(201).json(names)
      })
    
}


// /* STRIPE PAYMENT METHOD */
// module.exports.stripePayment = function(req,res,next) {
  
//     stripe.charges.create({
//       amount: req.body.amount*100,
//       currency: 'INR',
//       description: 'Payment for Crop Purchase',
//       source: req.body.token.id
//     }, (err, charge)=>{
//       if(err){
//        next(err);
//       }
//       res.json({success:true, status:"Payment Successfull"})
//     })

//     console.log(req.body);
// }

/* STRIPE PAYMENT METHOD */

// const url = "http://localhost:3000/farmer/profile/" + crop.uploader;
//         axios
//           .get(url , {headers: {
//             Authorization: 'Bearer ' + token, //the token is a variable which holds the token
//             ServiceName: 'CropService'
//           }})
//           .then((response) => {
//             res.status(201).json({
//               name,
//               type,
//               quantity,
//               location,
//               farmerName: response.data.name,
//               farmerPhone: response.data.phone,
//               description: response.data.description,
//             });
//           })
//           .catch((err) => res.status(404).json({ error: err }));
