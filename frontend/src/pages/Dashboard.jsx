import { useEffect, useState } from "react";
import { connectLive } from "../services/socket";
import EngineCard from "../components/cards/EngineCard";

export default function Dashboard() {

  const [engines, setEngines] = useState([]);

  useEffect(() => {

    // ✅ connect websocket
    const socket = connectLive((data) => {

      console.log("LIVE DATA:", data);

      // backend sends { assets: [...] }
      setEngines(data.assets || []);
    });

    // ✅ cleanup (VERY IMPORTANT)
    return () => {
      socket?.disconnect();
    };

  }, []);

  return (
    <div className="dashboard">

      <h2>SAEL Realtime Monitoring</h2>

      <div className="grid">
        {engines.map(engine => (
          <EngineCard
            key={engine.engine_id}
            engine={engine}
          />
        ))}
      </div>

    </div>
  );
}