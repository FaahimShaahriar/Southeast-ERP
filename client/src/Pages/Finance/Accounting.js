import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../../Layout/MainLayout";
import Sidebar2 from "../../Components/sidebar2"; // Import your sidebar component
import ExpenseCard from "../../Components/ExpenseCard";
import "../../Style/accounting.css";
import axios from "axios";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { generateBillReport } from "../../Functions/generatePdf";

const AccountingPage = () => {
  const [showBillsPage, setShowBillsPage] = useState(false);
  const [showVouchersPage, setShowVouchersPage] = useState(false);
  const [billData, setDataList] = useState([]); //Bills

  const [items, setItems] = useState([{ description: "", amount: 0 }]);
  // console.log(items);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/GetBills");
      setDataList(response.data);
      console.log(response.data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  const siteWorkBills = [
    { id: 1, description: "Site Work Bill 1", amount: 100 },
    { id: 2, description: "Site Work Bill 2", amount: 200 },
  ];

  const officeRelatedBills = [
    { id: 1, description: "Office Bill 1", amount: 150 },
    { id: 2, description: "Office Bill 2", amount: 250 },
  ];

  const formRef = useRef(null);
  const handleAddItem = () => {
    setItems([...items, { description: "", amount: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = name === "amount" ? parseFloat(value) : value;
    setItems(newItems);
  };

  //Submit Bill
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      items: items,
      type: e.target.type.value,
      dateIssued: e.target.dateIssued.value,
      status: e.target.status.value,
    };
    console.log(formData);
    try {
      const response = await axios.post("/addBills", formData);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bill data has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        formRef.current.reset(); // Clear the form
        setItems([{ description: "", amount: 0 }]); // Reset items
      }
    } catch (error) {
      console.error("Error saving bill data:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save bill data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const [addBilll, setAddBill] = useState(false);
  const addBill = () => {
    setAddBill(true);
  };
  const closeModal = () => {
    setShowBillsPage(true);
    setAddBill(false);
  };

  const siteBills = billData.filter((bill) => bill.type === "Site");
  const officeBills = billData.filter((bill) => bill.type === "Office");

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(billData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bills");
    XLSX.writeFile(workbook, "SldlBills.xlsx");
  };

  const TotalBill = () => {
    return billData.reduce((total, bill) => {
      const billTotal = bill.items.reduce((sum, item) => {
        const amount = item.amount;
        return !isNaN(amount) ? sum + amount : sum;
      }, 0);
      return total + billTotal;
    }, 0);
  };

  const recentExpense = () => {
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    let totalExpense = 0;
    billData.forEach((bill) => {
      const dateIssued = new Date(bill.dateIssued);
      if (
        dateIssued >= tenDaysAgo &&
        dateIssued <= today &&
        bill.status == "Paid"
      ) {
        const billTotal = bill.items.reduce((sum, item) => {
          const amount = parseFloat(item.amount);
          return !isNaN(amount) ? sum + amount : sum;
        }, 0);
        totalExpense += billTotal;
      }
    });

    return totalExpense;
  };

  const PendingBill = () => {
    let totalbill = 0;
    return billData.reduce((total, bill) => {
      if (bill.status == "Pending") {
        const billTotal = bill.items.reduce((sum, item) => {
          const amount = item.amount;
          return !isNaN(amount) ? sum + amount : sum;
        }, 0);
        totalbill = total + billTotal;
      }
      return totalbill;
    }, 0);
  };

  return (
    <MainLayout>
      <div className="content">
        <Sidebar2></Sidebar2>
        <div className="accountpage">
          <button
            className="generate-report-button"
            onClick={() => generateBillReport(billData)}
          >
            Generate Report
          </button>
          <button className="generate-report-button" onClick={generateExcel}>
            Generate Sheet
          </button>
          <div>
            <div className="overview">
              <h1>Account Overview</h1>
              <div className="card-container">
                <ExpenseCard
                  title="Total Expense"
                  amount={TotalBill()}
                  description="The total expenses incurred."
                />
                <ExpenseCard
                  title="Pending Expense"
                  amount={PendingBill()}
                  description="Expenses that are pending approval."
                />
                <ExpenseCard
                  title="Monthly Budgets"
                  amount=""
                  description="The budget allocated for this month."
                />
                <ExpenseCard
                  title="Recent Expense"
                  amount={recentExpense()}
                  description="The most recent expense recorded."
                />
              </div>
            </div>
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                setShowBillsPage(true);
                setShowVouchersPage(false);
              }}
            >
              Bills
            </button>
            <button
              onClick={() => {
                setShowVouchersPage(true);
                setShowBillsPage(false);
              }}
            >
              Vouchers
            </button>
          </div>
          {showBillsPage && (
            <div className="billpageDiv">
              <div className="addbill">
                <button onClick={addBill}>Add Bill</button>
              </div>

              <div className="billing-container">
                <div className="table-container">
                  <h2>Office Bills</h2>
                  <table className="site-work-table">
                    {/* <colgroup>
                      <col style={{ width: "5%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "35%" }} />
                    </colgroup> */}
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date Issued</th>
                        <th>Description</th>
                        <th>Ammount</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {officeBills.map((bill) => (
                        <React.Fragment key={bill.id}>
                          {bill.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              {itemIndex === 0 && (
                                <>
                                  <td rowSpan={bill.items.length}>
                                    {bill.billNumber}
                                  </td>

                                  <td rowSpan={bill.items.length}>
                                    {new Date(
                                      bill.dateIssued
                                    ).toLocaleDateString()}
                                  </td>
                                </>
                              )}
                              <td>{item.description}</td>
                              <td>{item.amount.toFixed(2)}৳</td>
                              <td>{bill.status}</td>
                              <td>
                                <button>View</button>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="table-container">
                  <h2>Site Related Bills</h2>
                  <table className="site-work-table">
                    {/* <colgroup>
                      <col style={{ width: "5%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "35%" }} />
                    </colgroup> */}
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date Issued</th>
                        <th>Description</th>
                        <th>Ammount</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {siteBills.map((bill) => (
                        <React.Fragment key={bill.id}>
                          {bill.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              {itemIndex === 0 && (
                                <>
                                  <td rowSpan={bill.items.length}>
                                    {bill.billNumber}
                                  </td>

                                  <td rowSpan={bill.items.length}>
                                    {new Date(
                                      bill.dateIssued
                                    ).toLocaleDateString()}
                                  </td>
                                </>
                              )}
                              <td>{item.description}</td>
                              <td>{item.amount.toFixed(2)}৳</td>
                              <td>{bill.status}</td>
                              <td>
                                <button>View</button>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {showVouchersPage && <div>voucher</div>}
          {addBilll && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>

                <div className="bill-form-container">
                  <form
                    ref={formRef}
                    className="bill-form"
                    onSubmit={handleSubmit}
                  >
                    {items.map((item, index) => (
                      <div key={index}>
                        <div className="descriptionandammount">
                          <input
                            name="description"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                          <input
                            name="amount"
                            type="number"
                            placeholder="Amount"
                            value={item.amount}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                          <span
                            className="close"
                            onClick={() => handleRemoveItem(index)}
                          >
                            {" "}
                            &times;
                          </span>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={handleAddItem}>
                      Add Item
                    </button>

                    <label>
                      Status:
                      <select name="type">
                        <option value="Site">Site</option>
                        <option value="Office">Office</option>
                      </select>
                    </label>
                    <label>
                      Date Issued:
                      <input type="date" name="dateIssued" />
                    </label>
                    <label>
                      Status:
                      <select name="status">
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </label>
                    <button type="submit">Save Bill</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountingPage;
