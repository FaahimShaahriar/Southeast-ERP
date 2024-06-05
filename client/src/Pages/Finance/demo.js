<div className="payroll">
            <div className="top-section">
              <button className="generate-report-button"onClick={generateExcel}>
                Generate Report
              </button>
              <div className="total-due">
                Total Payment Due: ${calculateTotalDue()}
              </div>
            </div>
            <h1>Payroll Page</h1>
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Payday</th>
                  <th>Pay Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((payroll) => (
                  <tr key={payroll._id}>
                  <td>{payroll.employee ? `${payroll.employee.personalInformation.firstName} ${payroll.employee.personalInformation.lastName}` : 'Unknown'}</td>
                  <td>{payroll.employee ? payroll.employee.miscellaneous.employeeIDNumber : 'Unknown'}</td>
                  <td>{new Date(payroll.payday).toLocaleDateString()}</td>
                  <td>${payroll.payAmount}</td>
                  <td>
                    <div className={`status ${payroll.status.toLowerCase()}`}>
                      {payroll.status}
                    </div>
                  </td>
                  <td>
                    <button className="action-button">Action</button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>