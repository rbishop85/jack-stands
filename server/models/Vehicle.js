const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const vehicleSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
  },
  // color: {
  //   type: String,
  // },
  addedDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  soldDate: {
    type: Date,
    get: (timestamp) => dateFormat(timestamp),
  },
  ownerId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photos: [
    {
      type: String
    }
  ],
  updates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Update'
    }
  ],
},
{ 
  timestamps: true 
});

const Vehicle = model("Vehicle", vehicleSchema);

module.exports = Vehicle;
