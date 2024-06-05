import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/sidebar.css";
import logo from "../../src/logo.svg";
const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null); // Initialize selectedItem state

  const handleItemClick = (item) => {
    setSelectedItem(item); // Update selectedItem state when a list item is clicked
  };
  return (
    <div className="navbar">
      {/* <div className="logo">
          <image> src={logo} alt="Logo" </image>
        </div> */}
      <ul className="nav-links">
        <li>
          <Link to="/hr">Home</Link>
        </li>
        <li>
          <Link
            to="/Employee_Management"
            onClick={() => handleItemClick("Employee Management")}
          >
            Employee Management
          </Link>
        </li>
        <li>
          <Link to="/Attendance&Leave_Management">Attendace & <br></br>Leave </Link>
        </li>
        <li>
          <Link to="/Clients">Clients </Link>
        </li>
        <li>
          <Link to="/Training">Training & Development</Link>
        </li>
        <div className="line"></div>
        <li>
          <Link to="/Training">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
