import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "30px" }}>
        {children}
      </div>
    </>
  );
};

export default Layout;