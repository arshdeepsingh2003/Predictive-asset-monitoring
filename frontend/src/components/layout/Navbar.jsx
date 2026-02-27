import { Link } from "react-router-dom";
import "../../styles/components/_navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Predictive Monitoring</div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/assets">Assets</Link>
      </div>
    </nav>
  );
};

export default Navbar;