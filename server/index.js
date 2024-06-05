const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require('openai');
bodyParser = require("body-parser");
const {
  EmployeeSchema,
  payrollSchema,
  leaveSchema,
  attendanceSchema,
} = require("../server/schema");
const {
  BillSchema,
  ProjectSchema,
  ClientSchema,
} = require("../server/schema2");

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
const Bills = mongoose.model("bills", BillSchema);
const Project = mongoose.model("Projects", ProjectSchema);
const Client = mongoose.model("Clients", ClientSchema);

//POST METHODS

app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data save successfully" });
});

app.post("/saveClient", async (req, res) => {
  console.log(req.body);
  const data = new Client(req.body);
  await data.save();
  res.send({ success: true, message: "Client data save successfully" });
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
  const data = new Leave(req.body);
  await data.save();
  res.send({ success: true, message: "Laeve data save successfully" });
});

app.post("/saveAttendance", async (req, res) => {
  console.log(req.body);
  try {
    const attendanceData = req.body;
    for (let i = 0; i < attendanceData.length; i++) {
      const data = new attendance(attendanceData[i]);
      await data.save();
      res.send({ success: true, message: "atendace data save successfully" });
    }
  } catch (error) {
    console.error("Error saving attendance data:", error);
    res
      .status(500)
      .send({ success: false, message: "Failed to save attendance data" });
  }
});

app.post("/addBills", async (req, res) => {
  try {
    // Find the bill with the highest billNumber
    const highestBill = await Bills.findOne().sort({ billNumber: -1 }).exec();
    let newBillNumber = 1;

    if (highestBill) {
      newBillNumber = parseInt(highestBill.billNumber, 10) + 1;
    }

    // Create new bill data
    const newBillData = {
      ...req.body,
      billNumber: newBillNumber,
    };

    const newBill = new Bills(newBillData);
    await newBill.save();
    res.send({ success: true, message: "Bill data saved successfully" });
  } catch (error) {
    console.error("Error saving bill data:", error);
    res
      .status(500)
      .send({ success: false, message: "Failed to save bill data" });
  }
});

app.post("/addProject", async (req, res) => {
  console.log(req.body);
  const data = new Project(req.body);
  await data.save();
  res.send({ success: true, message: "Project data save successfully" });
});

//UPDATE
app.put("/updateClient", async (req, res) => {
  const { email, ...updateData } = req.body;

  try {
    const client = await Client.findOneAndUpdate({ email }, updateData, {
      new: true,
    });

    if (!client) {
      return res
        .status(404)
        .send({ success: false, message: "Client not found" });
    }

    res.send({ success: true, message: "Client updated successfully", client });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while updating the client",
    });
  }
});

//DELETE
const handleDeleteClient = async (email) => {
  try {
    const response = await axios.delete("/deleteClient", { data: { email } });
    if (response.data.success) {
      const updatedClients = clientsData.filter(
        (client) => client.email !== email
      );
      setClientsData(updatedClients);
      Swal.fire("Success", "Client deleted successfully", "success");
    } else {
      Swal.fire("Error", response.data.message, "error");
    }
  } catch (error) {
    Swal.fire("Error", "An error occurred while deleting the client", "error");
  }
};

//GET METHODS
app.get("/GetEmp", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee data" });
  }
});

app.get("/GetClients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Client data" });
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
app.get("/getPayroll", async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("employee");
    res.json(payrolls);
  } catch (error) {
    console.error("Error fetching payroll data:", error);
    res.status(500).send("Server error");
  }
});

app.get("/getLeave", async (req, res) => {
  try {
    const leaveRequests = await Leave.find().populate("employeeId");
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

app.get("/GetBills", async (req, res) => {
  try {
    const bills = await Bills.find();
    res.json(bills);
  } catch (error) {
    console.error("Error fetching payroll data:", error);
    res.status(500).send("Server error");
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/southeast")
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => console.log("serve is running"));
  })
  .catch((err) => console.log(err));
