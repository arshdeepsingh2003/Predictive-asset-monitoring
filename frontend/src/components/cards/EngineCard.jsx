export default function EngineCard({engine}){

const getColor=()=>{

if(engine.severity==="CRITICAL") return "red"
if(engine.severity==="WARNING") return "orange"
return "green"

}

return(

<div className={`engine-card ${getColor()}`}>

<h3>Engine {engine.engine_id}</h3>

<p>RUL: {Math.round(engine.predicted_rul)}</p>

<p>Health: {engine.health_index.toFixed(2)}</p>

<p>Status: {engine.severity}</p>

</div>

)
}