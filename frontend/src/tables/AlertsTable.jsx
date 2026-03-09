export default function AlertsTable({ alerts = [] }) {

if (!alerts || alerts.length === 0) {
return <p>No alerts available</p>
}

return (

<table className="alerts-table">

<thead>
<tr>
<th>Engine</th>
<th>Severity</th>
<th>RUL</th>
</tr>
</thead>

<tbody>

{alerts.map((alert, index) => (

<tr key={index}>
<td>{alert.engine_id}</td>
<td>{alert.severity}</td>
<td>{Math.round(alert.predicted_rul || 0)}</td>
</tr>

))}

</tbody>

</table>

)

}