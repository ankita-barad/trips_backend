require("dotenv").config();
const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { tripRoute } = require("./route/trip.route");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", tripRoute);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server is running on ${process.env.PORT}`);
});
