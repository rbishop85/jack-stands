const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const updateSchema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  photos: [
    {
      type: String
    }
  ],
  description: {
    type: String,
    required: true,
  },
});

const Update = model("Update", updateSchema);

module.exports = Update;
