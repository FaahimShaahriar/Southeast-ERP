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
  const [addSection, setAddSection] = useState(false); // employee form

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
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");

  //-----------------------------------------------
  const { BardAPI } = require("bard-api-node");
  const bard = new BardAPI();
  const generationConfig = {
    temperature: 0.7,
    topK: 5,
    topP: 0.9,
    maxOutputTokens: 1024,
  };
  bard.setResponseGenerationConfig(generationConfig);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiKey = "AIzaSyAIZu8eUzphh_dwbORbS3sv0pt8bdQUrZ4";
      await bard.initializeChat(apiKey);
      const response = await bard.getBardResponse(inputText);
      const { response: bardResponse, text } = response;
      setOutputText(`${text}`);
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the response.");
      setOutputText("");
    }
  };

  const viewChatgptPage = () => {
    setAddSection(true);
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
                onClick={() => generatePayrollReport(payrolls)}
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
              <button
                className="generate-report-button"
                onClick={viewChatgptPage}
              >
                AI
              </button>
            </div>
            {addSection && (
              <div className="chat-container">
                <div className="chat-box" id="chat-box"></div>
                <input className="chatinput"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a question..."
                />
                <button className="chatbutton" onClick={handleSubmit}>Send</button>
                <div className="outputText">{outputText}</div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Payroll;
