import Sidebar from "../Components/sidebar";
import { useNavigate } from "react-router-dom";
import "../Style/MainLayout.css";
import logo from "../../src/logo.jpg";
import Swal from "sweetalert2";
function MainLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: "Logged out",
          html: "I will close in <b></b> milliseconds.",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        console.log("User confirmed logout");
        localStorage.setItem("authToken", null);
        navigate("/");
      }
    });
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
