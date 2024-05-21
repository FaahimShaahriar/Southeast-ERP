const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
bodyParser = require("body-parser");
const {
  EmployeeSchema,
  payrollSchema,
  leaveSchema,
  attendanceSchema,
} = require("../server/schema");
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
const Leave = mongoose.model("Leave", leaveSchema);
const Payroll = mongoose.model("Payroll", payrollSchema);
const attendance = mongoose.model("attendance", attendanceSchema);

//Adding

app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data save successfully" });
});

app.post("/AddEmp", async (req, res) => {
  console.log(req.body);
  const data = new Employee(req.body);
  const payday = calculateSalaryDate(data.employmentDetails.dateOfHire);

  const payrollData = {
    employee: data._id,
    payday: payday,
    payAmount: data.compensationAndBenefits.salary,
    status: "Pending",
  };
  const newPayroll = new Payroll(payrollData);

  await data.save();
  await newPayroll.save();

  res.send({ success: true, message: "data save successfully" });
});

//Leave Request
app.post("/leaveRequest", async (req, res) => {
  console.log(req.body);
  const data = new attendance(req.body);
  await data.save();
  res.send({ success: true, message: "Laeve data save successfully" });
});


app.post("/saveAttendance", async (req, res) => {
  console.log(req.body);
  const data = new attendance(req.body);
  await data.save();
  res.send({ success: true, message: "atendace data save successfully" });
});

//FETCH DATA

app.get("/GetEmp", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee data" });
  }
});

app.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee data" });
  }
});

// app.get("/getPayroll", async (req, res) => {
//   try {
//     const payroll = await Payroll.find();
//     // const payrollData = await PayrollModel.find({}).populate("employee");
//     res.json(payroll);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching payroll data" });
//   }
// });
// Example backend route to get payrolls with employee details
app.get('/getPayroll', async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate('employee');
    res.json(payrolls);
    
  } catch (error) {
    console.error("Error fetching payroll data:", error);
    res.status(500).send("Server error");
  }
});


app.get('/getLeave', async (req, res) => {
  try {
    const leaveRequests= await Leave.find().populate('employeeId');
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Leave data" });
  }
});

function calculateSalaryDate(dateOfHire) {
  const hireDate = new Date(dateOfHire);
  const salaryDate = new Date(hireDate);
  salaryDate.setDate(hireDate.getDate() + 30);
  return salaryDate;
}

mongoose
  .connect("mongodb://127.0.0.1:27017/southeast")
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => console.log("serve is running"));
  })
  .catch((err) => console.log(err));
