const express = require("express");
const router = express.Router();

const eventModel = require("../models/Event");

router.get("/", async (req, res, next) => {
  try {
    // Get all the events
    eventModel.find().then((eventDocument) => {
      res.status(200).json(eventDocument);
      console.log(eventDocument);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/create", (req, res, next) => {
  const { title, start, end, resourceId } = req.body;

  const newEvent = {
    title,
    start,
    end,
    resourceId,
  };

  console.log(newEvent);

  eventModel
    .create(newEvent)
    .then((eventDocument) => {
      res.status(200).json(eventDocument);
      console.log(eventDocument);
    })
    .catch(next);
});

module.exports = router;
