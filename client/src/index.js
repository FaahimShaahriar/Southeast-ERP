import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeManagementPage from "./Pages/HR/Employee_Management";
import { FinanceDashboard } from "./Pages/Finance/Finance_Dashboard";
import Training_and_Development from "./Pages/HR/Training_and_Development";
import AttendancePage from "./Pages/HR/Attendance_Management";
import LeaveManagementPage from "./Pages/HR/Leave_Management";
import Accounting from "./Pages/Finance/Accounting";
import Payroll from "./Pages/Finance/Payroll";
import ExpenseManagement from "./Pages/Finance/ExpenseManagement";
import Budget from "./Pages/Finance/Budget"
import LoginPage from "./Pages/LoginPage";
import HR_Dashboard from "./Pages/HR/Hr_Dashboard";



const router = createBrowserRouter([
  {
    path: "/hello",
    element: <div>Hello world!</div>,
  },
  {
    path: "/hr",
    element: <HR_Dashboard/>,
  },
  {
    path: "/",
    element: <LoginPage/>,
  },

  
//HR ROUTES

{
  path: "/Employee_Management",
  element: <EmployeeManagementPage/>,
},
{
  path: "/Leave_Management",
  element: <LeaveManagementPage/>,
},
{
  path: "/Attendance",
  element: <AttendancePage/>,
},
{
  path: "/Training",
  element: <Training_and_Development/>,
},


//Fianace////////////////////////////////////////////
{
  path: "/FinanceDashboard",
  element: <FinanceDashboard/>,
},
{
  path: "/Accounting",
  element: <Accounting/>,
},

{
  path: "/Payroll",
  element: <Payroll/>,
},
{
  path: "/Expense",
  element: <ExpenseManagement/>,
},
{
  path: "/Budget",
  element: <Budget/>,
},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
