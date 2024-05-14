import React, { useState, useEffect } from "react";
import "../../Style/Attendance.css";
import Sidebar from "../../Components/sidebar";
import MainLayout from "../../Layout/MainLayout";

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData()
      .then((data) => setAttendanceData(data))
      .catch((error) =>
        console.error("Error fetching attendance data:", error)
      );
  }, []);

  const fetchAttendanceData = async () => {
    // Simulate fetching data from an API
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyData = [
          {
            id: 1,
            employeeName: "John Doe",
            date: "2022-04-23",
            status: "Present",
            late: false,
          },
          {
            id: 2,
            employeeName: "Jane Smith",
            date: "2022-04-23",
            status: "Absent",
            late: true,
          },
          // Add more dummy data as needed
        ];
        resolve(dummyData);
      }, 1000); // Simulate delay of 1 second
    });
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedData = attendanceData.map((entry) => {
      if (entry.id === id) {
        return { ...entry, status: newStatus };
      }
      return entry;
    });
    setAttendanceData(updatedData);
    // Here you can send a request to your backend to update the status
  };

  const handleLateChange = (id, isLate) => {
    const updatedData = attendanceData.map((entry) => {
      if (entry.id === id) {
        return { ...entry, late: isLate };
      }
      return entry;
    });
    setAttendanceData(updatedData);
    // Here you can send a request to your backend to update the late status
  };

  return (
    <MainLayout>
      <div className="Body">
        <Sidebar></Sidebar>
        <div className="attendance-page">
          <h1>Attendance Page</h1>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Late</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.employeeName}</td>
                  <td>{entry.date}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={entry.status === "Present"}
                      onChange={() =>
                        handleStatusChange(
                          entry.id,
                          entry.status === "Present" ? "Absent" : "Present"
                        )
                      }
                    />{" "}
                    Present
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={entry.late}
                      onChange={() => handleLateChange(entry.id, !entry.late)}
                    />{" "}
                    Late
                  </td>
                  <td>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className="attendancebuttondiv">
            <button className="attendancebutton">Save</button>
            </div>
            
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AttendancePage;
