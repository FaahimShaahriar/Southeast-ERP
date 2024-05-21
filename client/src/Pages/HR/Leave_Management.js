import React from "react";
import { useState, useEffect } from "react";
import "../../Style/leavemanagement.css";
import MainLayout from "../../Layout/MainLayout";
import Sidebar from "../../Components/sidebar";

import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.baseURL = "http://localhost:8080/";

const LeaveManagementPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]); //initial
  const [filteredRequests, setFilteredRequests] = useState([]); // the one selected
  const [LeaveList, setLeaveData] = useState([]);

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

  const getFetchData = async () => {
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
    getFetchData();
  }, []);

  console.log(LeaveList);
  return (
    <div>
      <MainLayout>
        <div className="Content">
          <Sidebar></Sidebar>

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
                    <td></td>
                    <td>
                      <button className="action-button">Action</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default LeaveManagementPage;
