import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Components/sidebar";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <MainLayout>
      <div className="main-content">
        <Sidebar></Sidebar>

        <div className="content2">
          <h1>Welcome to Southeast Land Development pvt ltd</h1>
          <p>This is the main content of our homepage.</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
