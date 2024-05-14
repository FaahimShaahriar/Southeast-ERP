import React from "react";
import MainLayout from "../../Layout/MainLayout";
import Sidebar2 from "../../Components/sidebar2";
import "../../Style/accounting.css";
export const FinanceDashboard = () => {
  return (
    <div>
      <MainLayout>
        <div className="content">
          <Sidebar2></Sidebar2>
        </div>
      </MainLayout>
    </div>
  );
};
