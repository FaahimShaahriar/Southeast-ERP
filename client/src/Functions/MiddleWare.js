// AuthMiddleware.js
import React from "react";
import { Navigate } from "react-router-dom";

const AuthMiddleware = ({ children }) => {
   const token = localStorage.getItem('authToken');
  const isAuthenticated = token && token.includes("jihan");

  
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default AuthMiddleware;
