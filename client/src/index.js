import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeManagementPage from "./Pages/HR/Employee_Management";
import { FinanceDashboard } from "./Pages/Finance/Finance_Dashboard";
import Training_and_Development from "./Pages/HR/Training_and_Development";
import ClientsPage from "./Pages/HR/Clients";
import LeaveManagementPage from "./Pages/HR/Leave_Management";
import Accounting from "./Pages/Finance/Accounting";
import Payroll from "./Pages/Finance/Payroll";
import ExpenseManagement from "./Pages/Finance/ExpenseManagement";
import Budget from "./Pages/Finance/Budget";
import LoginPage from "./Pages/LoginPage";
import HR_Dashboard from "./Pages/HR/Hr_Dashboard";
import AuthMiddleware from "./Functions/MiddleWare";

const router = createBrowserRouter([
  {
    path: "/hello",
    element: <div>Hello world!</div>,
  },

  {
    path: "/",
    element: <LoginPage />,
  },

  //HR ROUTES
  {
    path: "/hr",
    element: (
      <AuthMiddleware>
        <HR_Dashboard />
      </AuthMiddleware>
    ),
  },
  {
    path: "/Employee_Management",
    element: (
      <AuthMiddleware>
        <EmployeeManagementPage />
      </AuthMiddleware>
    ),
  },
  {
    path: "/Attendance&Leave_Management",
    element: (
      <AuthMiddleware>
        <LeaveManagementPage />
      </AuthMiddleware>
    ),
  },
  {
    path: "/Clients",
    element: (
      <AuthMiddleware>
        <ClientsPage />
      </AuthMiddleware>
    ),
  },
  {
    path: "/Training",
    element: (
      <AuthMiddleware>
        <Training_and_Development />
      </AuthMiddleware>
    ),
  },

  //Fianace////////////////////////////////////////////
  {
    path: "/FinanceDashboard",
    element: <FinanceDashboard />,
  },
  {
    path: "/Accounting",
    element: <Accounting />,
  },

  {
    path: "/Payroll",
    element: <Payroll />,
  },
  {
    path: "/Expense",
    element: <ExpenseManagement />,
  },
  {
    path: "/Budgeting",
    element: <Budget />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
