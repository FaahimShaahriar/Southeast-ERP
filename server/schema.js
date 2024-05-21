const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
bodyParser = require("body-parser");

const app = express();

const EmployeeSchema = new mongoose.Schema({
  personalInformation: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String },
    gender: { type: String },
  },
  employmentDetails: {
    jobTitle: { type: String, required: true },
    department: { type: String },
    employmentStatus: { type: String },
    dateOfHire: { type: Date },
  },
  compensationAndBenefits: {
    salary: { type: Number },
    bankAccountDetails: { type: String },
    benefitsEnrollment: { type: String },
  },
  miscellaneous: {
    profilePicture: { type: String }, // Store file path or URL
    nidPicture: { type: String }, // Store file path or URL
    employeeIDNumber: { type: String },
  },
});

// Create a model using the schema
const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Assuming you have an Employee model
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["Sick", "Casual", "Annual", "Maternity", "Paternity", "Unpaid"],
      required: true,
    },
    leaveStartDate: {
      type: Date,
      required: true,
    },
    leaveEndDate: {
      type: Date,
      required: true,
    },
    leaveReason: {
      type: String,
      required: true,
    },
    leaveStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    appliedOn: {
      type: Date,
      default: Date.now,
    },
    approvedOn: {
      type: Date,
    },
    rejectedOn: {
      type: Date,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    payday: {
      type: Date,
      required: true,
    },
    payAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

//Attendance
const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Assuming you have an Employee model
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    late: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

module.exports = {
  EmployeeSchema,
  leaveSchema,
  payrollSchema,
  attendanceSchema,
};
