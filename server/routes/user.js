const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    // Get all the users
    UserModel.find().then((userDocument) => {
      res.status(200).json(userDocument);
      console.log(userDocument);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/teams", (req, res, next) => {
  UserModel.find()
    .populate("team")
    .then((userDocument) => {
      console.log(userDocument);
      res.status(201).json(userDocument);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  //Get a specific user
  UserModel.findById(req.params.id)
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

router.patch("/:id", (req, res, next) => {
  // Update a specific user
  console.log(req.body);
  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// Find users in team

module.exports = router;
