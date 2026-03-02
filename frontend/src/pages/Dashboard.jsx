import { useEffect, useState } from "react";
import { connectSocket } from "../services/socket";
import EngineCard from "../components/cards/EngineCard";

export default function Dashboard() {

  const [assets, setAssets] = useState([]);

  useEffect(() => {

    connectSocket((data) => {
      setAssets(data.assets);
    });

  }, []);

  return (
    <div className="dashboard">

      <h2>Realtime Engine Monitoring</h2>

      <div className="engine-grid">
        {assets.map(engine => (
          <EngineCard
            key={engine.engine_id}
            engine={engine}
          />
        ))}
      </div>

    </div>
  );
}