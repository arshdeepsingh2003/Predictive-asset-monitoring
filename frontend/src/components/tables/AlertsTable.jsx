import "../../styles/components/_tables.scss";

const AlertsTable = ({ alerts }) => {
  return (
    <table className="alerts-table">
      <thead>
        <tr>
          <th>Engine</th>
          <th>Severity</th>
          <th>Anomaly</th>
          <th>Health</th>
        </tr>
      </thead>

      <tbody>
        {alerts.map((a, i) => (
          <tr key={i}>
            <td>{a.engine_id}</td>
            <td>{a.severity}</td>
            <td>{a.anomaly_score.toFixed(2)}</td>
            <td>{(a.health_index*100).toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlertsTable;