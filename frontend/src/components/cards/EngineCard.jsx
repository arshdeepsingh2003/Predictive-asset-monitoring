export default function EngineCard({ engine }) {

  const severityColor = {
    NORMAL: "#22c55e",
    WARNING: "#f59e0b",
    CRITICAL: "#ef4444"
  };

  return (
    <div className="engine-card">

      <h3>Engine {engine?.engine_id}</h3>

      <p>RUL: {Math.round(engine?.predicted_rul || 0)}</p>

      <p>
        Severity:
        <span style={{ color: severityColor[engine?.severity] }}>
          {" "}{engine?.severity}
        </span>
      </p>

      <p>
        Health: {engine?.health_index ? engine.health_index.toFixed(2) : "N/A"}
      </p>

    </div>
  );
}