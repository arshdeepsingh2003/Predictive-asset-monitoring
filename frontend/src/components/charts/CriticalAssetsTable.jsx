export default function CriticalAssetsTable({engines}){

const critical = engines
.filter(e=>e.severity==="CRITICAL")

return(

<table className="analytics-table">

<thead>

<tr>

<th>Asset</th>
<th>Health</th>
<th>RUL</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{critical.map(e=>(

<tr key={e.engine_id}>

<td>Engine {e.engine_id}</td>

<td>{(e.health_index*100).toFixed(0)}%</td>

<td>{Math.round(e.predicted_rul)}</td>

<td className="badge critical">CRITICAL</td>

</tr>

))}

</tbody>

</table>

)
}