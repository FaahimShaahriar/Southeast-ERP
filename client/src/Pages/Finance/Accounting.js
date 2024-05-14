import React, { useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import Sidebar2 from "../../Components/sidebar2"; // Import your sidebar component
import "../../Style/accounting.css";
const AccountingPage = () => {
  const [showBillsPage, setShowBillsPage] = useState(false);
  const [showVouchersPage, setShowVouchersPage] = useState(false);

  return (
    <MainLayout>
  
      <div className="content">
      <Sidebar2></Sidebar2>
        <div className="accountpage">
          <h1>Accounting Page</h1>
          <div className="buttons">
            <button onClick={() => setShowBillsPage(true)}>Bills</button>
            <button onClick={() => setShowVouchersPage(true)}>Vouchers</button>
          </div>
          {showBillsPage && <div>bills</div>}
          {showVouchersPage && (<div>voucher</div>)}
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountingPage;
