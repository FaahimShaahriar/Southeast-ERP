const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

mongoose
  .connect("mongodb://localhost:27017//southeast")
  .then(() => console.log("connected to db"));

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.listen(PORT, () => console.log("serve is running"));
