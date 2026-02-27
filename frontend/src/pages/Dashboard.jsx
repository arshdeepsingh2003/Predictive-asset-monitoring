import { useEffect, useState } from "react";
import StatusCard from "../components/cards/StatusCard";
import EngineCard from "../components/cards/EngineCard";
import HealthChart from "../components/charts/HealthChart";
import axios from "axios";

const Dashboard = () => {

  const [engines, setEngines] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/assets")
      .then(res => setEngines(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", margin: "30px 0" }}>
        <StatusCard title="Total Engines" value={engines.length} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {engines.map(engine => (
          <EngineCard key={engine.engine_id} engine={engine} />
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>Health Overview</h2>
      <HealthChart data={engines} />

    </div>
  );
};

export default Dashboard;