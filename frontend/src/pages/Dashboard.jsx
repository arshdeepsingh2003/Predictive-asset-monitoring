import { useEffect, useState } from "react";
import StatusCard from "../components/cards/StatusCard";
import HealthChart from "../components/charts/HealthChart";
import api from "../services/api";

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    alerts: 0,
    critical: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="card-grid">
        <StatusCard title="Total Engines" value={stats.total}/>
        <StatusCard title="Active Alerts" value={stats.alerts}/>
        <StatusCard title="Critical Alerts" value={stats.critical}/>
      </div>

      <HealthChart />
    </div>
  );
}