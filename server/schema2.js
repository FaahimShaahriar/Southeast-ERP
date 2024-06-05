const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
bodyParser = require("body-parser");

const app = express();

//Bills
const BillSchema = new mongoose.Schema({
  billNumber: { type: String, required: false, unique: true },
  items: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  type: { type: String, required: true },
  dateIssued: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Overdue"],
    default: "Pending",
  },
});

//Payment
const PaymentSchema = new mongoose.Schema({
  paymentNumber: { type: String, required: true, unique: true },
  billId: { type: mongoose.Schema.Types.ObjectId, ref: "Bill", required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  amount: { type: Number, required: true },
  datePaid: { type: Date, required: true },
  method: {
    type: String,
    enum: ["Credit Card", "Bank Transfer", "Cash"],
    required: true,
  },
});

//Client
const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  projectID: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: false },
  ],
});

//Projects

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  details: {
    NoOfFloor: { type: String, required: false },
    unitPerFloor: { type: Number, required: false },
  },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: false,
  },
  status: {
    type: String,
    enum: ["Ongoing", "Completed", "On Hold"],
    required: true,
  },
  picture: [{ url: { type: String, required: false } }],
});

const Floor = new mongoose.Schema({
  unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
});
const Unit = new mongoose.Schema({
  unitName: { type: String, required: true },
});

const clientProject = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientSchema",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectSchema",
    required: true,
  },
  name: { type: String, required: true },
});

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Maintenance",
      "Utilities",
      "Marketing",
      "Legal Fees",
      "Insurance",
      "Taxes",
      "Office Supplies",
      "Travel",
      "Salaries",
      "Other",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: false,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  BillSchema,
  PaymentSchema,
  ClientSchema,
  ProjectSchema,
  expenseSchema,
};
