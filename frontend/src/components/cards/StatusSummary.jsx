import "../../styles/components/_cards.scss"

export default function StatusSummary({ engines = [] }) {

  const total = engines.length

  const normal = engines.filter(e => e.severity === "NORMAL").length
  const warning = engines.filter(e => e.severity === "WARNING").length
  const critical = engines.filter(e => e.severity === "CRITICAL").length

  const avgHealth = engines.length
    ? Math.round(
        (engines.reduce((sum, e) => sum + (e.health_index || 0), 0) /
          engines.length) * 100
      )
    : 0

  return (

    <div className="summary-grid">

      <div className="summary-card total">
        <h4>Total Engines</h4>
        <h2>{total}</h2>
      </div>

      <div className="summary-card normal">
        <h4>Normal</h4>
        <h2>{normal}</h2>
      </div>

      <div className="summary-card warning">
        <h4>Warning</h4>
        <h2>{warning}</h2>
      </div>

      <div className="summary-card critical">
        <h4>Critical</h4>
        <h2>{critical}</h2>
      </div>

      <div className="summary-card health">
        <h4>System Health</h4>
        <h2>{avgHealth}%</h2>
      </div>

    </div>

  )
}