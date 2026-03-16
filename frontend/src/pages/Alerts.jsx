import { useEffect, useState } from "react"
import { connectLive, disconnectLive } from "../services/socket"
import { AlertTriangle } from "lucide-react"

import "../styles/components/alerts.css"

export default function Alerts(){

  const [engines,setEngines] = useState([])
  const [activeTab,setActiveTab] = useState("WARNING")

  useEffect(()=>{

    connectLive((data)=>{
      setEngines(data)
    })

    return ()=> disconnectLive()

  },[])


  const alerts = engines.filter(
    e => e.severity === "WARNING" || e.severity === "CRITICAL"
  )


  const warningCount =
    alerts.filter(e=>e.severity==="WARNING").length

  const criticalCount =
    alerts.filter(e=>e.severity==="CRITICAL").length


  const filteredAlerts =
    alerts.filter(e => e.severity === activeTab)


  return(

    <div className="alerts-page">

      <h2>Alert Command Center</h2>


      {/* TABS */}

      <div className="alert-tabs">

        <div
          className={`alert-tab warning ${activeTab==="WARNING"?"active":""}`}
          onClick={()=>setActiveTab("WARNING")}
        >

          ⚠ Warnings

          <span>{warningCount}</span>

        </div>


        <div
          className={`alert-tab critical ${activeTab==="CRITICAL"?"active":""}`}
          onClick={()=>setActiveTab("CRITICAL")}
        >

          🚨 Critical

          <span>{criticalCount}</span>

        </div>

      </div>


      {/* ALERT FEED */}

      <div className="alerts-feed">

        {filteredAlerts.length === 0 && (
          <div className="no-alerts">
            No alerts in this category
          </div>
        )}

        {filteredAlerts.map(engine=>(

          <div
            key={engine.engine_id}
            className={`alert-item ${engine.severity.toLowerCase()}`}
          >

            <AlertTriangle size={18}/>

            <div className="alert-info">

              <strong>Engine {engine.engine_id}</strong>

              <p>Cycle: {engine.cycle}</p>

              <p>RUL: {Math.round(engine.predicted_rul)}</p>

            </div>

            <div className="alert-time">

              {new Date().toLocaleTimeString()}

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}