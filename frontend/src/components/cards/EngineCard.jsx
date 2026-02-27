const getColor = (severity) => {
  switch (severity) {
    case "CRITICAL":
      return "#ef4444"; // red
    case "WARNING":
      return "#f59e0b"; // orange
    default:
      return "#22c55e"; // green
  }
};

const EngineCard = ({ name, rul, severity }) => {

  const percent = Math.min((rul / 130) * 100, 100);
  const color = getColor(severity);

  return (
    <div className="engine-card">
      <h3>{name}</h3>

      <p>RUL: {rul} cycles</p>

      <div className="progress">
        <div
          className="bar"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <span
        className="badge"
        style={{
          backgroundColor: color,
        }}
      >
        {severity}
      </span>
    </div>
  );
};

export default EngineCard;