const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const partSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  photos: [
    {
      type: String
    }
  ],
  addedDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  ownerId: {
    type: String,
    required: true,
  },
},
{ 
  timestamps: true 
});

const Part = model("Part", partSchema);

module.exports = Part;
