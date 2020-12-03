const Crop = require("../models/crop.model");
const axios = require("axios");

module.exports.getCrops = function (req, res, next) {
  Crop.find({})
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something Went Wrong" });
    });
};

module.exports.getCropById = function (req, res, next) {

  Crop.findById(req.params.cropId)
    .then((crop) => {
      if (crop) {
        const { name, type, quantity, location, uploader } = crop;
        
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
                farmerName: response.data.name,
                farmerPhone: response.data.phone,
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

module.exports.postCropDetails = function (req, res, next) {
  const crop = new Crop(req.body);

  crop
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((err) => console.log(err));
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
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.deleteCropById = function (req, res, next) {
  const id = req.params.cropId;

  Crop.findOneAndDelete({ _id: id })
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};



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
