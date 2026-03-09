export default function AlertCard({alert}){

return(

<div className="alert-card">

<h4>Engine {alert.engine_id}</h4>

<p>Severity: {alert.severity}</p>

<p>RUL: {Math.round(alert.predicted_rul)}</p>

</div>

)
}