import Sidebar from "../Components/sidebar";
import { useNavigate } from "react-router-dom";
import "../Style/MainLayout.css";
import logo from "../../src/logo.jpg";
function MainLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Handle logout logic here
      console.log("User confirmed logout");

      navigate("/");
    } else {
      console.log("User cancelled logout");
    }
  };

  return (
    <div className="main">
      <div className="Navbar">
        <img src={logo} alt="Logo" className="logo" />
        <h1>SOUTHEAST LAND DEVELOPMENT (PVT) LTD</h1>
        <div className="container"></div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="body">
        <div class="content">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
