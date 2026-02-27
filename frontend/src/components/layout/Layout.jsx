import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: "240px" }}>
        <Navbar />
        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;