export default function EngineCard({ engine }) {

  const getColor = () => {
    if (engine.severity === "CRITICAL") return "red";
    if (engine.severity === "WARNING") return "orange";
    return "green";
  };

  return (
    <div
      className="engine-card"
      style={{ borderColor: getColor() }}
    >
      <h3>Engine {engine.engine_id}</h3>

      <p>RUL: {engine.predicted_rul.toFixed(2)}</p>
      <p>Health: {(engine.health_index*100).toFixed(1)}%</p>
      <p>Status: {engine.severity}</p>

    </div>
  );
}