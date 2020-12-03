const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

function getToken(data) {
  return jwt.sign(data, "heisenberg", { expiresIn: "120s" });
}

function verifyToken(token) {
  let tokenData;
  jwt.verify(token, "heisenberg", (err, decodedToken) => {
    if (err) {
      return err;
    }
    tokenData = decodedToken;
  });
  return tokenData;
}

router.post("/", (req, res, next) => {
  console.log(req.body);
  const token = getToken(req.body);

  res.json({ message: "req recieved", token });
});

router.post("/verify", (req, res, next) => {
  const recvToken = req.body.token;
  const token = recvToken.split(" ")[1];
  //console.log(token);
  const tokenData = verifyToken(token);
  res.status(201).json(tokenData);
});

module.exports = router;
