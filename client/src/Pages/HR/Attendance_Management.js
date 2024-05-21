import React, { useState, useEffect } from "react";
import "../../Style/Attendance.css";
import Sidebar from "../../Components/sidebar";
import MainLayout from "../../Layout/MainLayout";
import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.baseURL = "http://localhost:8080/";

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [dataList, setDataList] = useState([]); //Employee

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/saveAttendance", attendanceData);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Attendance data has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error saving attendance data:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save attendance data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get("/GetEmp");
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
              </tr>
            </thead>
            <tbody>
              {dataList.map((entry) => (
                <tr>
                  <td>
                    {entry.personalInformation.firstName}{" "}
                    {entry.personalInformation.lastName}
                  </td>
                  <td>{entry.date}</td>
                  <td>
                    <input
                      type="checkbox"
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
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className="attendancebuttondiv">
              <button className="attendancebutton" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AttendancePage;
