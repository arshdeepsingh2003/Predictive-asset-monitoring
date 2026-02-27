import { useEffect, useState } from "react";
import axios from "axios";

const Alerts = () => {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/alerts")
      .then(res => setAlerts(res.data));
  }, []);

  return (
    <div>
      <h1>Alerts</h1>

      {alerts.map(alert => (
        <div key={alert._id} className="alert-card">
          <h3>Engine {alert.engine_id}</h3>
          <p>Severity: {alert.severity}</p>
          <p>Score: {alert.anomaly_score}</p>
        </div>
      ))}
    </div>
  );
};

export default Alerts;