import React, { useState } from "react";
import "../../Style/leavemanagement.css";
import MainLayout from "../../Layout/MainLayout";
import Sidebar from "../../Components/sidebar";
const LeaveManagementPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  // Dummy leave requests data
  const dummyLeaveRequests = [
    {
      id: 1,
      employeeName: "John Doe",
      startDate: "2024-04-01",
      endDate: "2024-04-05",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      startDate: "2024-04-10",
      endDate: "2024-04-15",
      status: "Approved",
    },
    {
      id: 3,
      employeeName: "Alice Johnson",
      startDate: "2024-04-20",
      endDate: "2024-04-25",
      status: "On Leave",
    },
    // Add more dummy data as needed
  ];

  // Set initial state with all leave requests
  useState(() => {
    setLeaveRequests(dummyLeaveRequests);
    setFilteredRequests(dummyLeaveRequests);
  }, []);

  // Function to filter leave requests based on status
  const filterRequests = (status) => {
    if (status === "All") {
      setFilteredRequests(leaveRequests);
    } else {
      const filtered = leaveRequests.filter(
        (request) => request.status === status
      );
      setFilteredRequests(filtered);
    }
  };
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
                  <th>Employee Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.employeeName}</td>
                    <td>{request.startDate}</td>
                    <td>{request.endDate}</td>
                    <td>{request.status}</td>
                    <td>
                      {request.status === "Pending" && (
                        <>
                          <button className="leavebutton"onClick={() => handleApprove(request.id)}>
                            Approve
                          </button>
                          <button onClick={() => handleDeny(request.id)}>
                            Deny
                          </button>
                        </>
                      )}
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
