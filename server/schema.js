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
      gender: { type: String}
    },
    employmentDetails: {
      jobTitle: { type: String, required: true },
      department: { type: String },
      employmentStatus: { type: String},
      dateOfHire: { type: String }
    },
    compensationAndBenefits: {
      salary: { type: Number },
      bankAccountDetails: { type: String },
      benefitsEnrollment: { type: String }
    },
    miscellaneous: {
      profilePicture: { type: String }, // Store file path or URL
      nidPicture: { type: String }, // Store file path or URL
      employeeIDNumber: { type: String }
    }
  });
  
  // Create a model using the schema
  
  module.exports = {
    EmployeeSchema,
    
  };