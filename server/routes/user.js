const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");


router.get("/", (req, res, next) => {
  // Get all the users
  UserModel.find()
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  // Deletes a user
  UserModel.findByIdAndRemove(req.params.id)
    .then((userDocument) => {
      // res.sendStatus(204)
      res.status(204).json({
        message: "Successfuly deleted !",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;