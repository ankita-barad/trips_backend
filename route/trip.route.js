const express = require("express");
const { TripModel } = require("../model/trip.model");

const tripRoute = express.Router();

tripRoute.post("/add-trip", async (req, res) => {
  try {
    const { name, email, destination, noOfTravelers, budgetPerPerson } =
      req.body;

    const newTrip = new TripModel({
      name,
      email,
      destination,
      noOfTravelers,
      budgetPerPerson,
    });
    await newTrip.save();
    res.status(200).send(newTrip);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

tripRoute.get("/get-trip", async (req, res) => {
  try {
    const trips = await TripModel.find();
    res.status(200).send(trips);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

tripRoute.delete("/delete-trip/:id", async (req, res) => {
  try {
    const trip = await TripModel.findByIdAndDelete(req.params.id);
    res.status(200).send(trip);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

tripRoute.put("/filter-trip/:destination", async (req, res) => {
  try {
    const { destination } = req.params;
    const query = destination === "All" ? {} : { destination };
    const trip = await TripModel.find(query);
    res.status(200).send(trip);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

tripRoute.put("/sort-trip/:budget", async (req, res) => {
  try {
    const { budget } = req.params;
    const sortCriteria =
      budget === "asc"
        ? { budgetPerPerson: 1 }
        : budget === "desc"
        ? { budgetPerPerson: -1 }
        : {};
    const trips = await TripModel.find().sort(sortCriteria);
    res.status(200).send(trips);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = { tripRoute };
