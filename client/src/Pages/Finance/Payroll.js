import React from "react";
import "../../Style/accounting.css";
import MainLayout from "../../Layout/MainLayout";
import Sidebar2 from "../../Components/sidebar2";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/";

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);

  // Function to calculate total payment due amount
  const calculateTotalDue = () => {};

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get("/getPayroll");
      setPayrolls(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);
  console.log(payrolls);


  return (
    <div>
      <MainLayout>
        <div className="Content">
          <Sidebar2></Sidebar2>
          <div className="payroll">
            <div className="top-section">
              <button className="generate-report-button">
                Generate Report
              </button>
              <div className="total-due">
                Total Payment Due: ${calculateTotalDue()}
              </div>
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
                  <tr key={payroll._id}>
                  <td>{payroll.employee ? `${payroll.employee.personalInformation.firstName} ${payroll.employee.personalInformation.lastName}` : 'Unknown'}</td>
                  <td>{payroll.employee ? payroll.employee.employeeIDNumber : 'Unknown'}</td>
                  <td>{new Date(payroll.payday).toLocaleDateString()}</td>
                  <td>${payroll.payAmount}</td>
                  <td>
                    <div className={`status ${payroll.status.toLowerCase()}`}>
                      {payroll.status}
                    </div>
                  </td>
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

export default Payroll;
