import React from "react";
import "../Style/ExpenseCard.css";

const ExpenseCard = ({ title, amount, description }) => {
  return (
    <div className="expense-card">
      <h2>{title}</h2>
      <p className="amount">{amount}  ৳</p>
      <p>{description}</p>
    </div>
  );
};

export default ExpenseCard;
