import { NavLink } from "react-router-dom";
import "../../styles/components/_sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>PAM</h2>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/assets">Assets</NavLink>
        <NavLink to="/alerts">Alerts</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;