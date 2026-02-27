import "../../styles/components/_cards.scss";

const AlertCard = ({ alert }) => {

  const color =
    alert.severity === "CRITICAL"
      ? "danger"
      : alert.severity === "WARNING"
      ? "warning"
      : "success";

  return (
    <div className={`alert-card ${color}`}>
      <h3>Engine {alert.engine_id}</h3>
      <p>Severity: {alert.severity}</p>
      <p>Anomaly: {alert.anomaly_score.toFixed(3)}</p>
    </div>
  );
};

export default AlertCard;