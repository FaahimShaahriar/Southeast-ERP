import React, { useState } from "react";
import "../../Style/accounting.css";
import MainLayout from "../../Layout/MainLayout";
import Sidebar2 from "../../Components/sidebar2";


const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);

  // Dummy payroll data
  const dummyPayrolls = [
    {
      id: 1,
      employeeName: "John Doe",
      employeeId: "EMP001",
      payday: "2024-04-30",
      payAmount: "$2000",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      payday: "2024-04-30",
      payAmount: "$2500",
      status: "Success",
    },
    // Add more dummy data as needed
  ];

  // Set initial state with dummy payroll data
  useState(() => {
    setPayrolls(dummyPayrolls);
  }, []);

  // Function to calculate total payment due amount
  const calculateTotalDue = () => {
    // Logic to sum up pay amounts for pending payments
    const totalDue = payrolls.reduce((total, payroll) => {
      if (payroll.status === "Pending") {
        return total + parseInt(payroll.payAmount.replace("$", ""), 10);
      }
      return total;
    }, 0);
    return totalDue;
  };

  return (
    <div>
      <MainLayout>
        <div className="Content">
          <Sidebar2></Sidebar2>
          <div className="payroll">
            <div className="top-section">
              <button className="generate-report-button">Generate Report</button>
              <div className="total-due">Total Payment Due: ${calculateTotalDue()}</div>
            </div>
            <h1>Payroll Page</h1>
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Payday</th>
                  <th>Pay Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((payroll) => (
                  <tr key={payroll.id}>
                    <td>{payroll.employeeName}</td>
                    <td>{payroll.employeeId}</td>
                    <td>{payroll.payday}</td>
                    <td>{payroll.payAmount}</td>
                    <td>
                      <div className={`status ${payroll.status.toLowerCase()}`}>
                        {payroll.status}
                      </div>
                    </td>
                    <td>
                      {/* Add action button here */}
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

export default Payroll;
