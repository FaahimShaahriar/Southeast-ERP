import React from "react";
import "../../Style/payroll.css";
import MainLayout from "../../Layout/MainLayout";
import Sidebar2 from "../../Components/sidebar2";
import { useState, useEffect } from "react";
import { generatePayrollReport } from "../../Functions/generatePdf";
import axios from "axios";
import * as XLSX from "xlsx";
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

  // Function to generate Excel file
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(payrolls);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll");
    XLSX.writeFile(workbook, "payroll.xlsx");
  };

  const TotalPayroll = () => {
    let total = 0;
    for (let i = 0; i < payrolls.length; i++) {
      if (payrolls[i].status == "Pending") {
        total = total + parseFloat(payrolls[i].payAmount);
      }
    }

    return total;
  };

  return (
    <div>
      <MainLayout>
        <div className="content">
          <Sidebar2></Sidebar2>
          <div className="payroll">
            <div className="top-section">
              <button
                className="generate-report-button"
                onClick={()=>generatePayrollReport(payrolls)}
              >
                Generate Report
              </button>
              <button
                className="generate-report-button"
                onClick={generateExcel}
              >
                Generate Sheet
              </button>
              <div className="space"></div>

              <div className="total-due">
                Total Payment Due: {TotalPayroll()}৳
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
                    <td>
                      {payroll.employee
                        ? `${payroll.employee.personalInformation.firstName} ${payroll.employee.personalInformation.lastName}`
                        : "Unknown"}
                    </td>
                    <td>
                      {payroll.employee
                        ? payroll.employee.miscellaneous.employeeIDNumber
                        : "Unknown"}
                    </td>
                    <td>{new Date(payroll.payday).toLocaleDateString()}</td>
                    <td>{payroll.payAmount}৳</td>
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
