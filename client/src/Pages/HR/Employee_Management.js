import React from "react";
import Sidebar from "../../Components/sidebar"; // Import your sidebar component
import "../../Style/Employee_Management.css";
import MainLayout from "../../Layout/MainLayout";
import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

const EmployeeManagementPage = () => {
  const [addSection, setAddSection] = useState(false);
  const [addSection2, setAddSection2] = useState(false);
  const [addSection3, setAddSection3] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormdata] = useState({
    personalInformation: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
    },
    employmentDetails: {
      jobTitle: "",
      department: "",
      employmentStatus: "",
      dateOfHire: "",
    },
    compensationAndBenefits: {
      salary: "",
      bankAccountDetails: "",
      benefitsEnrollment: "",
    },
    miscellaneous: {
      profilePicture: "",
      nidPicture: "",
      employeeIDNumber: "",
    },
  });
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
   const data = await axios.post("/AddEmp", formData);
    console.log(data);
    setAddSection(false);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    const [section, field] = name.split('.');
    setFormdata(prevFormData => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [field]: value
      }
    }));
  };

  return (
    <MainLayout>
      <div className="content">
        <Sidebar></Sidebar>
        <div className="employee-management-page">
          <div className="buttons">
            <button
              className="button"
              onClick={() => {
                setAddSection2(true);
                setAddSection(false);
                setAddSection3(false);
              }}
            >
              Employee List
            </button>
            <button
              className="button"
              onClick={() => {
                setAddSection(true);
                setAddSection2(false);
                setAddSection3(false);
              }}
            >
              Add Employee Page
            </button>
          </div>
          {addSection && (
            <form onSubmit={handleSubmit}>
              <div className="content">
                <div className="employeeForm">
                  <div className="margin">
                    <label className="">Personal Information:</label>
                  </div>
                  <div className="line"></div>
                  <div className="Formcontent">
                    <label htmlFor="firsNname">Fast Name</label>
                    <input
                      type="text"
                      id="name"
                      name="fname"
                      onChange={handleOnChange}
                    ></input>
                    <label htmlFor="lname">Last Name</label>
                    <input
                      type="text"
                      id="name"
                      name="lastName"
                      onChange={handleOnChange}
                    ></input>

                    <label for="datepicker">Date Of Birth </label>
                    <input
                      type="date"
                      id="datepicker"
                      name="dateOfBirth"
                      onChange={handleOnChange}
                    ></input>
                    <label for="dropdown">Gender</label>
                    <select
                      id="dropdown"
                      name="gender"
                      onChange={handleOnChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="margin">
                    <label className="">Employment Details:</label>
                  </div>
                  <div className="line"></div>
                  <div className="Formcontent">
                    <label htmlFor="jobtitle">Job Tittle</label>
                    <input
                      type="text"
                      id="name"
                      name="jobTitle"
                      onChange={handleOnChange}
                    ></input>
                    <label for="dropdown">Department</label>
                    <select
                      id="dropdown"
                      name="department"
                      onChange={handleOnChange}
                    >
                      <option value="sales">Sales & Marketing</option>
                      <option value="accounts">Accounts/HR</option>
                      <option value="development">Development</option>
                      <option value="office">Office</option>
                    </select>
                    <label for="dropdown">Employment Status</label>
                    <select
                      id="dropdown"
                      name="employmentStatus"
                      onChange={handleOnChange}
                    >
                      <option value="fulltime">Full-time</option>
                      <option value="parttime"> Part-time</option>
                      <option value="Contractor">Contractor</option>
                    </select>
                    <label for="datepicker2">Date of Hire </label>
                    <input
                      type="date"
                      id="dateofhire"
                      name="dateOfHire"
                      onChange={handleOnChange}
                    ></input>
                  </div>
                </div>
                <div className="vline"></div>
                <div className="employeeForm2">
                  <div className="margin">
                    <label className="">Compensation and Benefits::</label>
                  </div>
                  <div className="line"></div>
                  <div className="Formcontent">
                    <label htmlFor="salary">Salary/Wage</label>
                    <input
                      type="text"
                      id="name"
                      name="salary"
                      onChange={handleOnChange}
                    ></input>
                    <label htmlFor="bank">
                      Bank Account Details (for direct deposit)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name=" bankAccountDetails"
                      onChange={handleOnChange}
                    ></input>
                    <label htmlFor="Benefits">
                      Benefits Enrollment (Health Insurance, Retirement Plans,
                      etc.)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="benefitsEnrollment"
                      onChange={handleOnChange}
                    ></input>
                  </div>
                  <div className="margin">
                    <label className="">Miscellaneous:</label>
                  </div>
                  <div className="line"></div>
                  <div className="Formcontent">
                    <label htmlFor="profile">Profile Picture</label>
                    <input type="file" />
                    <label htmlFor="nid">NID Picture</label>
                    <input type="file" />
                    <label>Employee ID Number </label>
                    <input
                      type="text"
                      id="idnumber"
                      name=" employeeIDNumberr"
                      onChange={handleOnChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="submitbuton">
                <button>Submit</button>
              </div>
            </form>
          )}
          {addSection2 && (
            <div>
              <div className="dropDownMenu">
                <label htmlFor="dropdown">Select an option:</label>
                <select
                  id="dropdown"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="Manager">Manager</option>
                  <option value="SalesAndMarketing">Sales & Marketing</option>
                  <option value="Accounts/HR">Accounts/HR</option>
                  <option value="Engineer">Engineer</option>
                  <option value="SiteManager">Site Manager</option>
                  <option value="IT">IT</option>
                </select>
                <p>Selected option: {selectedOption}</p>
              </div>

              <div className="employeeCards">
                <div className="employee-card">
                  <h2>
                    Name: Jihanul Hasan
                    {/* {firstName} {lastName} */}
                  </h2>
                  <p>
                    Department :IT
                    {/* <strong>Position:</strong> {position} */}
                  </p>
                  <p>
                    Email: Jihanul@gmail.com
                    {/* <strong>Department:</strong> {department} */}
                  </p>
                  {/* <button onClick={handleViewDetails}>View Full Details</button> */}

                  <button>View</button>
                </div>
                <div className="employee-card">
                  <h2>
                    Name: Jihanul Hasann
                    {/* {firstName} {lastName} */}
                  </h2>
                  <p>
                    Department :IT
                    {/* <strong>Position:</strong> {position} */}
                  </p>
                  <p>
                    Email: Jihanul@gmail.com
                    {/* <strong>Department:</strong> {department} */}
                  </p>
                  {/* <button onClick={handleViewDetails}>View Full Details</button> */}

                  <button
                    onClick={() => {
                      setAddSection3(true);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {addSection3 && <div className="view"></div>}
      </div>
    </MainLayout>
  );
};

export default EmployeeManagementPage;
