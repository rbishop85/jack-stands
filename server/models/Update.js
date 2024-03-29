const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const updateSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String
    }
  ],
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  ownerId: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  updatedDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Update = model("Update", updateSchema);

module.exports = Update;
