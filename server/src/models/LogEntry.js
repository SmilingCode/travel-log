const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredNum = {
  required: true,
  type: Number
}

const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  latitude: {
    ...requiredNum,
    min: -90,
    max: 90
  },
  latitude: {
    ...requiredNum,
    min: -180,
    max: 180
  },
  visitDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema)

module.exports = LogEntry;