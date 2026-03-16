import "../../styles/components/_cards.scss"

export default function EngineCard({ engine }) {

  const healthPercent = engine?.health_index
    ? Math.round(engine.health_index * 100)
    : 0

  const severityClass = engine?.severity
    ? engine.severity.toLowerCase()
    : "normal"

  return (

    <div className={`engine-card ${severityClass}`}>

      <div className="engine-header">

        <h3>Engine {engine?.engine_id}</h3>

        <span className={`badge ${severityClass}`}>
          {engine?.severity}
        </span>

      </div>

      <div className="engine-metrics">

        <p>Cycle: {engine?.cycle}</p>

        <p>RUL: {Math.round(engine?.predicted_rul || 0)}</p>

      </div>

      {/* HEALTH GAUGE */}

      <div className="health-section">

        <span>Health</span>

        <div className="health-bar">

          <div
            className="health-fill"
            style={{ width: `${healthPercent}%` }}
          />

        </div>

        <span>{healthPercent}%</span>

      </div>

    </div>
  )
}