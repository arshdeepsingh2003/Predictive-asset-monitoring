import { useEffect, useState } from "react"
import { connectLive, disconnectLive } from "../services/socket"
import HealthGauge from "../components/charts/HealthGauge"
import HealthDistributionChart from "../components/charts/HealthDistributionChart"
import FailureForecastChart from "../components/charts/FailureForecastChart"
import MaintenanceLoadChart from "../components/charts/MaintenanceLoadChart"
import "../styles/components/analytics.css"
import AIInsightsPanel from "../components/charts/AIInsightsPanel"

import "../styles/components/analytics.css"

export default function Analytics(){

  const [engines,setEngines] = useState([])

  useEffect(()=>{
    connectLive((data)=>setEngines(data))
    return ()=>disconnectLive()
  },[])

  // ===== KPIs =====

  const avgHealth = engines.length
    ? engines.reduce((sum,e)=>sum+e.health_index,0)/engines.length
    : 0

  const failureProb = (1-avgHealth).toFixed(2)
  const maintenanceProb = (1-(avgHealth*0.8)).toFixed(2)

  return(

    <div className="analytics-page">

      <h2>Asset Intelligence Analytics</h2>

      {/* ================= TOP ================= */}

      <div className="analytics-top">

        <div className="gauge-container">
          <HealthGauge value={avgHealth}/>
        </div>

        <div className="probability-column">

          <div className="kpi-card red">
            <h4>Failure Probability</h4>
            <h2>{failureProb}</h2>
          </div>

          <div className="kpi-card orange">
            <h4>Maintenance Probability</h4>
            <h2>{maintenanceProb}</h2>
          </div>

        </div>

      </div>

      {/* ================= MIDDLE ================= */}

      <div className="analytics-charts">

        <div className="chart-card">
          <h3>Health Distribution</h3>
          <HealthDistributionChart engines={engines}/>
        </div>

        <div className="chart-card">
          <h3>Failure Forecast</h3>
          <FailureForecastChart engines={engines}/>
        </div>

      </div>

      {/* ================= BOTTOM ================= */}

      <div className="analytics-charts">

        <div className="chart-card">
          <h3>Maintenance Load Forecast</h3>
          <MaintenanceLoadChart engines={engines}/>
        </div>

        <div className="chart-card">
          <h3>AI Insights</h3>
          <AIInsightsPanel engines={engines}/>
        </div>

      </div>

    </div>
  )
}