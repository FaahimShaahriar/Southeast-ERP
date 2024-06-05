import React from "react";
import Sidebar from "../../Components/sidebar"; // Import your sidebar component
import "../../Style/Accounts.css";
import MainLayout from "../../Layout/MainLayout";
import { useState } from "react";
import Sidebar2 from "../../Components/sidebar2";

const Payroll = () => {
  const [addSection, setAddSection] = useState(false);
  const [addSection2, setAddSection2] = useState(false);
  const [addSection3, setAddSection3] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <MainLayout>
      <div className="content">
        <Sidebar2></Sidebar2>
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
              Client
            </button>
            <button
              className="button"
              onClick={() => {
                setAddSection(true);
                setAddSection2(false);
                setAddSection3(false);
              }}
            >
              Loans
            </button>
          </div>
          {addSection && <div>hello</div>}
          {addSection2 && <div></div>}
        </div>
      </div>
    </MainLayout>
  );
};

export default Payroll;
