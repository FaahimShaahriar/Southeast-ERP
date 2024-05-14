const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
bodyParser = require("body-parser");
const { EmployeeSchema } = require("../server/schema");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

//scema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

//MODELS
const userModel = mongoose.model("user", schemaData);
const Employee = mongoose.model("Employee", EmployeeSchema);

app.get("/", async (req, res) => {
  res.json({ message: "server is running" });
});

app.post("/create",async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({success :true, message: "data save successfully"})
});

app.post("/AddEmp",async (req, res) => {
  console.log(req.body);
  const data = new Employee(req.body);
  await data.save();
  res.send({success :true, message: "data save successfully"})
});

mongoose
  .connect("mongodb://127.0.0.1:27017/southeast")
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => console.log("serve is running"));
  })
  .catch((err) => console.log(err));
