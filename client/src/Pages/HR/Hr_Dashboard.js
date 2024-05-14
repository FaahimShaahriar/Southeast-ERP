// import logo from "./logo.svg";
// import "./App.css";
import Sidebar from "../../Components/sidebar";
import MainLayout from "../../Layout/MainLayout";
import "../../Style/Employee_Management.css";
import img1 from "../../building.png";

function HR_Dashboard() {
  const imageUrl = "../../src/logo.jpg";
  return (
    <MainLayout>
      <div className="main-content">
        <Sidebar></Sidebar>

        <div className="content2">
          <h1>Welcome to Southeast Land Development pvt ltd</h1>
          <p>Find Your Dream Homes.</p>

          <div className="DashImages">
            <img src={img1} alt="Image" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HR_Dashboard;
