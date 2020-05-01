const express = require("express");

const ratingRouter = express.Router();

const RatingOption = require("../models/RatingOption");

ratingRouter.get("/", async (req, res, next) => {
  try {
    const options = await RatingOption.find();
    res.status(200);
    res.json(options);
  } catch (error) {
    next(error);
  }
});

ratingRouter.post("/", async (req, res, next) => {
  if (req.body != null) {
    RatingOption.create(req.body)
      .then((option) => {
        console.log("Options are created", option);
        res.status(200);
        res.json(option);
      })
      .catch((err) => next(err));
  }
});

module.exports = ratingRouter;