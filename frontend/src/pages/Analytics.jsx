import { useEffect, useState } from "react"
import { connectLive, disconnectLive } from "../services/socket"

import HealthGauge from "../components/charts/HealthGauge"
import HealthTrendChart from "../components/charts/HealthTrendChart"
import FailureTrendChart from "../components/charts/FailureTrendChart"
import HealthDistributionChart from "../components/charts/HealthDistributionChart"
import FailureRiskRankingChart from "../components/charts/FailureRiskRankingChart"

import "../styles/components/analytics.css"

export default function Analytics(){

  const [engines,setEngines] = useState([])

  useEffect(()=>{

    connectLive((data)=>{
      setEngines(data)
    })

    return ()=>disconnectLive()

  },[])

  const avgHealth = engines.length
    ? engines.reduce((sum,e)=>sum + e.health_index,0)/engines.length
    : 0

  const failureProb = (1-avgHealth).toFixed(2)

  const maintenanceProb = (1-(avgHealth*0.8)).toFixed(2)

  return(

    <div className="analytics-page">

      <h2>Asset Intelligence Analytics</h2>

      {/* TOP SECTION */}

      <div className="analytics-top">

        {/* GAUGE */}

        <div className="gauge-container">

          <HealthGauge value={avgHealth}/>

        </div>

        {/* KPI CARDS */}

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


      {/* TREND ANALYSIS */}

      <div className="analytics-charts">

        <div className="chart-card">

          <h3>Asset Health Trend</h3>

          <HealthTrendChart engines={engines}/>

        </div>

        <div className="chart-card">

          <h3>Failure Probability Trend</h3>

          <FailureTrendChart engines={engines}/>

        </div>

      </div>


      {/* DEEP ANALYTICS */}

      <div className="analytics-charts">

        <div className="chart-card">

          <h3>Health Distribution</h3>

          <HealthDistributionChart engines={engines}/>

        </div>

        <div className="chart-card">

          <h3>Failure Risk Ranking</h3>

          <FailureRiskRankingChart engines={engines}/>

        </div>

      </div>

    </div>
  )
}