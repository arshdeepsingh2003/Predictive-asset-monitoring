import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../styles/main.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;