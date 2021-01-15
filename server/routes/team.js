const express = require("express");
const router = express.Router();
const teamModel = require("../models/Team");

router.post("/", (req, res, next) => {
  const data = { ...req.body };
console.log(data)
 // Retrieve the authors id from the session.
  teamModel.create(data)
    .then((teamDocument) =>  {
          console.log(teamDocument);
          res.status(201).json(teamDocument); // send the populated document.
        })
        .catch(next);
   
});

module.exports = router;
