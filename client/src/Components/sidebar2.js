import React from "react";
import { Link } from "react-router-dom";
import "../Style/sidebar.css";
import logo from '../../src/logo.svg';
class Sidebar2 extends React.Component {
  render() {
    return (
      <div className="navbar">
        {/* <div className="logo">
          <image> src={logo} alt="Logo" </image>
        </div> */}
        <ul className="nav-links">
          <li>
            <Link to="/FinanceDashboard">Home</Link>
          </li>
          <li>
            <Link to="/Accounting">Accounting</Link>
          </li>
          <li>
            <Link to="/Payroll">Payroll Management</Link>
          </li>
          
          <li>
            <Link to="/Expense">Expense Management</Link>
          </li>
          <li>
            <Link to="/Budgeting">Bedgeting</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar2;
