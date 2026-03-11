export default function StatusSummary({ engines = [] }) {

const total = engines?.length || 0

const normal = engines.filter(e => e.severity === "NORMAL").length
const warning = engines.filter(e => e.severity === "WARNING").length
const critical = engines.filter(e => e.severity === "CRITICAL").length

return (

<div className="summary-grid">

<div className="summary-card">
<h4>Total Engines</h4>
<h2>{total}</h2>
</div>

<div className="summary-card green">
<h4>Running Normal</h4>
<h2>{normal}</h2>
</div>

<div className="summary-card orange">
<h4>Warnings</h4>
<h2>{warning}</h2>
</div>

<div className="summary-card red">
<h4>Critical</h4>
<h2>{critical}</h2>
</div>

</div>

)
}