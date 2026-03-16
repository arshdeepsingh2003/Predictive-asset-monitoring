import { useEffect, useState } from "react"
import { connectLive, disconnectLive } from "../services/socket"

import StatusSummary from "../components/cards/StatusSummary"
import EngineCard from "../components/cards/EngineCard"
import "../styles/components/Dashboard.css"
import { AlertTriangle, AlertCircle, Activity } from "lucide-react"

export default function Dashboard(){

  const [engines, setEngines] = useState([])

  useEffect(()=>{

    connectLive((assets)=>{

      setEngines(prev=>{
        if(JSON.stringify(prev) === JSON.stringify(assets)){
          return prev
        }
        return assets
      })

    })

    return ()=>{
      disconnectLive()
    }

  },[])

  // =========================
  // FILTER ENGINES
  // =========================

  const criticalEngines = engines
    .filter(e => e.severity === "CRITICAL")
    .sort((a,b) => a.predicted_rul - b.predicted_rul)
    .slice(0,5)

  const warningEngines = engines
    .filter(e => e.severity === "WARNING")
    .sort((a,b) => a.predicted_rul - b.predicted_rul)
    .slice(0,5)


  return(

    <div className="dashboard-container">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h1>AI Predictive Maintenance</h1>

          <p>Real-time monitoring of industrial assets</p>

        </div>

        <div className="live-indicator">

          <Activity size={18}/>
          Live Monitoring

        </div>

      </div>


      {/* SUMMARY */}

      <StatusSummary engines={engines}/>


      {/* CRITICAL ENGINES */}

      <div className="section">

        <div className="section-header critical">

          <AlertCircle size={20}/>
          Critical Engines

        </div>

        <div className="engine-grid">

          {criticalEngines.length === 0
          ? <div className="empty-state">No critical engines</div>
          : criticalEngines.map(engine => (

            <EngineCard
              key={engine.engine_id}
              engine={engine}
            />

          ))}

        </div>

      </div>


      {/* WARNING ENGINES */}

      <div className="section">

        <div className="section-header warning">

          <AlertTriangle size={20}/>
          Warning Engines

        </div>

        <div className="engine-grid">

          {warningEngines.length === 0
          ? <div className="empty-state">No warning engines</div>
          : warningEngines.map(engine => (

            <EngineCard
              key={engine.engine_id}
              engine={engine}
            />

          ))}

        </div>

      </div>


    </div>

  )

}