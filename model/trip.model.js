const mongoose = require("mongoose");

const tripschema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  destination: {
    type: String,
  },
  noOfTravelers: {
    type: Number,
  },
  budgetPerPerson: {
    type: Number,
  },
});

const TripModel = mongoose.model("trip", tripschema);

module.exports = { TripModel };
