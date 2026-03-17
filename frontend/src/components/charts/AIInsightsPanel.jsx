export default function AIInsightsPanel({engines}){

if(!engines.length) return null

const total = engines.length

const avgHealth =
engines.reduce((s,e)=>s+e.health_index,0)/total

const critical = engines.filter(e =>
  e.health_index < 0.4 || e.predicted_rul < 20
).length

const warning = engines.filter(e =>
  e.health_index < 0.7 && e.health_index >= 0.4
).length

// simulate future failures
const futureFailures = engines.filter(e =>
  e.predicted_rul < 30
).length

let healthMsg = ""
if(avgHealth > 0.7) healthMsg = "System health is good"
else if(avgHealth > 0.4) healthMsg = "System health is moderate"
else healthMsg = "System health is critical"

let message = []

message.push(`📊 ${healthMsg} with average health ${(avgHealth*100).toFixed(0)}%.`)

if(critical > 0){
  message.push(`🚨 ${critical} assets require immediate maintenance.`)
}

if(warning > 0){
  message.push(`⚠ ${warning} assets are in warning condition.`)
}

message.push(`📉 Failure forecast shows ${futureFailures} possible failures soon.`)

if(critical > 5){
  message.push(`💡 Recommendation: Urgent maintenance planning required.`)
}
else{
  message.push(`💡 Recommendation: System is stable but monitor closely.`)
}

return(

<div className="ai-panel">

  <h3>AI System Insights</h3>

  <ul>

    {message.map((m,i)=>(
      <li key={i}>{m}</li>
    ))}

  </ul>

</div>

)
}