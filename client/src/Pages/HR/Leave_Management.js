import React from "react";
import { useState, useEffect } from "react";
import "../../Style/leavemanagement.css";
import "../../Style/Attendance.css";
import MainLayout from "../../Layout/MainLayout";
import Sidebar from "../../Components/sidebar";

import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.baseURL = "http://localhost:8080/";
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();
const LeaveManagementPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]); //initial
  const [filteredRequests, setFilteredRequests] = useState([]); // the one selected
  const [LeaveList, setLeaveData] = useState([]);

  const [addSection, setAddSection] = useState(false); // leave
  const [addSection2, setAddSection2] = useState(false); //employee list

  const handleApprove = (id) => {
    // Logic to update the status of the leave request to 'Approved'
    // You can implement this logic according to your requirements
    console.log(`Leave request with ID ${id} has been approved`);
  };

  // Function to handle denial of leave request
  const handleDeny = (id) => {
    // Logic to update the status of the leave request to 'Denied'
    // You can implement this logic according to your requirements
    console.log(`Leave request with ID ${id} has been denied`);
  };

  const getLeaveData = async () => {
    try {
      const response = await axios.get("/getLeave");
      setLeaveData(response.data);
      setFilteredRequests(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to filter leave requests based on status
  const filterRequests = (status) => {
    if (status === "All") {
      setFilteredRequests(LeaveList);
    } else {
      const filtered = LeaveList.filter(
        (request) => request.leaveStatus === status
      );
      setFilteredRequests(filtered);
    }
  };
  useEffect(() => {
    getLeaveData();
  }, []);

  /////////////////////////////////////////////////////

  const [attendanceData, setAttendanceData] = useState([]);
  const [dataList, setDataList] = useState([]); //Employee

  //Save Attendace Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(attendanceData);
    try {
      const response = await axios.post("/saveAttendance", attendanceData);
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Attendance data has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error saving attendance data:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save attendance data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getEmpData = async () => {
    try {
      const response = await axios.get("/GetEmp");
      const initialAttendanceData = response.data.map((employee) => {
        //console.log(employee.miscellaneous.employeeIDNumber); // Log employee ID here
        return {
          employeeID: employee.miscellaneous.employeeIDNumber,
          date: new Date(),
          status: "Absent",
          late: false,
        };
      });

      setDataList(response.data);
      setAttendanceData(initialAttendanceData);
      console.log(response.data);
      console.log(initialAttendanceData);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getEmpData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    console.log("status working");
    console.log(attendanceData);
    const updatedData = attendanceData.map((entry) => {
      if (entry.employeeID === id) {
        return { ...entry, status: newStatus ? "Present" : "Absent" };
      }
      return entry;
    });
    setAttendanceData(updatedData);
    // Here you can send a request to your backend to update the status if needed
  };

  const handleLateChange = (id, isLate) => {
    console.log("late working");
    console.log(attendanceData);
    const updatedData = attendanceData.map((entry) => {
      if (entry.employeeID === id) {
        return { ...entry, late: isLate };
      }
      return entry;
    });
    setAttendanceData(updatedData);
  };

  console.log(LeaveList);

  useEffect(() => {
    setAddSection2(true);
  }, []);

  return (
    <div>
      <MainLayout>
        <div className="Content">
          <Sidebar></Sidebar>
          <div className="leave-management-page">
            <div className="buttons">
              <button
                className="button"
                onClick={() => {
                  setAddSection2(true);
                  setAddSection(false);
                }}
              >
                Attendance
              </button>
              <button
                className="button"
                onClick={() => {
                  setAddSection(true);
                  setAddSection2(false);
                }}
              >
                Leave
              </button>
            </div>

            {addSection && (
              <div className="leave">
                <h1>Leave Management Page</h1>
                <div>
                  <button onClick={() => filterRequests("All")}>All</button>
                  <button onClick={() => filterRequests("Pending")}>
                    Leave Requests
                  </button>
                  <button onClick={() => filterRequests("Approved")}>
                    Approved
                  </button>
                  <button onClick={() => filterRequests("On Leave")}>
                    On Leave
                  </button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request._id}>
                        <td>
                          {request.employeeId
                            ? `${request.employeeId.miscellaneous.employeeIDNumber} `
                            : "Unknown"}
                        </td>
                        <td>
                          {request.employeeId
                            ? `${request.employeeId.personalInformation.firstName} ${request.employeeId.personalInformation.lastName}`
                            : "Unknown"}
                        </td>
                        <td></td>
                        <td></td>
                        <td>{request.leaveStatus}</td>
                        <td>
                          <button className="action-button">Action</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {addSection2 && (
              <div className="attendance-page">
                <h1>Attendance Page</h1>
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Late</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map((entry) => (
                      <tr>
                        <td>{entry.miscellaneous.employeeIDNumber}</td>
                        <td>
                          {entry.personalInformation.firstName}{" "}
                          {entry.personalInformation.lastName}
                        </td>
                        <td>{formattedDate}</td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleStatusChange(
                                entry.miscellaneous.employeeIDNumber,
                                e.target.checked
                              )
                            }
                          />{" "}
                          Present
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleLateChange(
                                entry.miscellaneous.employeeIDNumber,
                                e.target.checked
                              )
                            }
                          />{" "}
                          Late
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <div className="attendancebuttondiv">
                    <button className="attendancebutton" onClick={handleSubmit}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default LeaveManagementPage;
