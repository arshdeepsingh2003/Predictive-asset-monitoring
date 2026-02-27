const EngineCard = ({ engine }) => {
  return (
    <div className="engine-card">
      <h3>Engine {engine.engine_id}</h3>
      <p>RUL: {engine.predicted_rul.toFixed(1)} cycles</p>
      <p>Status: {engine.severity}</p>
      <div className="health-bar">
        <div
          className="health-fill"
          style={{ width: `${engine.health_index * 100}%` }}
        />
      </div>
    </div>
  );
};

export default EngineCard;