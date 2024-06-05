import React from "react";
import Sidebar from "../../Components/sidebar"; // Import your sidebar component
import "../../Style/Employee_Management.css";
import MainLayout from "../../Layout/MainLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://localhost:8080/";

const EmployeeManagementPage = () => {
  const [addSection, setAddSection] = useState(false); // employee form
  const [addSection2, setAddSection2] = useState(false); //employee list
  const [selectedEmployee, setSelectedEmployee] = useState(null); //Detailed View

  const [selectedOption, setSelectedOption] = useState("");

  const [dataList, setDataList] = useState([]); //Employee

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    const formData = {
      personalInformation: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        dateOfBirth: e.target.dateOfBirth.value,
        gender: e.target.gender.value,
        email: e.target.email.value,
        contactNumber: e.target.contactNumber.value,
      },
      employmentDetails: {
        jobTitle: e.target.jobTitle.value,
        department: e.target.department.value,
        employmentStatus: e.target.employmentStatus.value,
        dateOfHire: e.target.dateOfHire.value,
      },
      compensationAndBenefits: {
        salary: parseFloat(e.target.salary.value),
        bankAccountDetails: e.target.bankAccountDetails.value,
        benefitsEnrollment: e.target.benefitsEnrollment.value,
      },
      miscellaneous: {
        profilePicture: "abcd",
        nidPicture: "abcd",
        employeeIDNumber: e.target.employeeIDNumber.value + "sldl",
        // profilePicture: e.target.profilePicture.value,
        // nidPicture: e.target.nidPicture.value,
        // employeeIDNumber: e.target.employeeIDNumber.value,
      },
    };
    console.log(formData);

    try {
      const data = await axios.post("/AddEmp", formData);
      if (data.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setAddSection(false);
    setAddSection2(true);
    setDataList([...dataList, formData]);
  };

  //Fetch All Employee
  const getFetchData = async () => {
    try {
      const response = await axios.get("/GetEmp");
      setDataList(response.data);
      console.log(response.data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);
  useEffect(() => {
    setAddSection2(true);
  }, []);
  console.log(dataList);

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setAddSection2(true);
    setAddSection(false);
  };
  const closeModal = () => {
    setSelectedEmployee(null);
    setAddSection2(true);
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
              }}
            >
              Employee List
            </button>
            <button
              className="button"
              onClick={() => {
                setAddSection(true);
                setAddSection2(false);
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
                    <label htmlFor="firstName">Fast Name</label>
                    <input type="text" id="name" name="firstName"></input>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="name" name="lastName"></input>

                    <label for="datepicker">Date Of Birth </label>
                    <input
                      type="date"
                      id="datepicker"
                      name="dateOfBirth"
                    ></input>
                    <label for="dropdown">Gender</label>
                    <select id="dropdown" name="gender">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email"></input>
                    <label htmlFor="contactnumber">Contact Number</label>
                    <input
                      type="text"
                      id="contactnumber"
                      name="contactNumber"
                    ></input>
                  </div>
                  <div className="margin">
                    <label className="">Employment Details:</label>
                  </div>
                  <div className="line"></div>
                  <div className="Formcontent">
                    <label htmlFor="jobtitle">Job Tittle</label>
                    <input type="text" id="name" name="jobTitle"></input>
                    <label for="dropdown">Department</label>
                    <select id="dropdown" name="department">
                      <option value="sales">Sales & Marketing</option>
                      <option value="accounts">Accounts/HR</option>
                      <option value="development">Development</option>
                      <option value="IT">IT</option>
                      <option value="office">Office</option>
                    </select>
                    <label for="dropdown">Employment Status</label>
                    <select id="dropdown" name="employmentStatus">
                      <option value="fulltime">Full-time</option>
                      <option value="parttime"> Part-time</option>
                      <option value="Contractor">Contractor</option>
                    </select>
                    <label for="datepicker2">Date of Hire </label>
                    <input
                      type="date"
                      id="dateofhire"
                      name="dateOfHire"
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
                    <input type="number" id="name" name="salary"></input>
                    <label htmlFor="bank">
                      Bank Account Details (for direct deposit)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="bankAccountDetails"
                    ></input>
                    <label htmlFor="Benefits">
                      Benefits Enrollment (Health Insurance, Retirement Plans,
                      etc.)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="benefitsEnrollment"
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
                      name="employeeIDNumber"
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
                  <option value="Sales & Marketing">Sales & Marketing</option>
                  <option value="Accounts/HR">Accounts/HR</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Site Manager">Site Manager</option>
                  <option value="IT">IT</option>
                </select>
                <p>Selected option: {selectedOption}</p>
              </div>
              <div className="employeeCards">
                {dataList.map((employee, index) => (
                  <div className="employee-card" key={index}>
                    <h2>
                      Name: {employee.personalInformation.firstName}{" "}
                      {employee.personalInformation.lastName}
                    </h2>
                    <p>Department: {employee.employmentDetails.department}</p>
                    <p>Email: {employee.personalInformation.email}</p>{" "}
                    <p>
                      Contact Number:{" "}
                      {employee.personalInformation.contactNumber}
                    </p>
                    <button onClick={() => handleViewDetails(employee)}>
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedEmployee && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h2>Employee Details</h2>
                {selectedEmployee && (
                  <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={closeModal}>
                        &times;
                      </span>
                      <h2>Employee Details</h2>
                      <div className="selectedempdata">
                        <span className="boldText">Name:</span>{" "}
                        <span>
                          {selectedEmployee.personalInformation.firstName}{" "}
                          {selectedEmployee.personalInformation.lastName}
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Email:</span>{" "}
                        <span>
                          {selectedEmployee.personalInformation.email}
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Department:</span>{" "}
                        <span>
                          {selectedEmployee.employmentDetails.department}
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Job Title:</span>{" "}
                        <span>
                          {selectedEmployee.employmentDetails.jobTitle}
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Date of Birth:</span>{" "}
                        <span>
                          {selectedEmployee.personalInformation.dateOfBirth}
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Gender:</span>{" "}
                        <span>
                          {selectedEmployee.personalInformation.gender}
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Salary:</span>{" "}
                        <span>
                          {selectedEmployee.compensationAndBenefits.salary}
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Bank Account:</span>{" "}
                        <span>
                          {
                            selectedEmployee.compensationAndBenefits
                              .bankAccountDetails
                          }
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Benefits:</span>{" "}
                        <span>
                          {
                            selectedEmployee.compensationAndBenefits
                              .benefitsEnrollment
                          }
                        </span>
                      </div>
                      <div className="selectedempdata">
                        <span className="boldText">Employee ID:</span>{" "}
                        <span>
                          {selectedEmployee.miscellaneous.employeeIDNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeManagementPage;
