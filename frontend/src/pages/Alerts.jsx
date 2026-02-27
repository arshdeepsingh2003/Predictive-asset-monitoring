import { useEffect, useState } from "react";
import api from "../services/api";
import AlertsTable from "../components/tables/AlertsTable";

export default function Alerts() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/alerts")
      .then(res => setAlerts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Alerts</h1>
      <AlertsTable alerts={alerts}/>
    </div>
  );
}