const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingOptionSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const RatingOption = mongoose.model("RatingOption", ratingOptionSchema);

module.exports = RatingOption;
