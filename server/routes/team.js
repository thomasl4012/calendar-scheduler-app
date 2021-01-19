const express = require("express");
const router = express.Router();
const teamModel = require("../models/Team");
const userModel = require("../models/User");
const util = require("util");
router.get("/", (req, res, next) => {
  // Get all the team
  teamModel
    .find()
    .then((teamDocument) => {
      res.status(200).json(teamDocument);
      console.log(teamDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// Create a team
router.post("/", (req, res, next) => {
  const data = { ...req.body };
  console.log(data);

  teamModel
    .create(data)
    .then((teamDocument) => {
      console.log(teamDocument);
      res.status(201).json(teamDocument);
    })
    .catch(next);
});

// Add a user to a team

router.post("/add", async (req, res, next) => {
  console.log(req.body);
  try {
    Promise.all([
      teamModel.findByIdAndUpdate(req.body.team_Id, {
        $addToSet: { userId: req.body.user_Id },
      }),
      userModel.findByIdAndUpdate(req.body.user_Id, {
        $addToSet: { team: req.body.team_Id },
      }),
    ]).then(([team, user]) => {
      teamModel
        .find()
        .populate("userId")
        .then((data) => {
          res.status(201).json(data);
          console.log(data);
        });
    });
  } catch (error) {
    next(error);
  }
});

// Find users in team

router.get("/users", (req, res, next) => {
  teamModel
    .find()
    .populate("userId")
    .then((teamDocument) => {
      console.log(teamDocument);
      res.status(201).json(teamDocument);
    })
    .catch(next);
});

// Find users in team

router.delete("/:id", (req, res, next) => {
  teamId = req.params.id;
  Promise.all([
    teamModel.findByIdAndRemove(teamId),
    userModel.updateMany(
      {},
      {
        $pull: { team: teamId },
      }
    ),
  ])
    .then(([team, user]) => {
      res.status(201);
      console.log(util.format("team=%O user=%O", team, user));
    })
    .catch(next);
});

module.exports = router;
