import HealthChart from "../components/charts/HealthChart"
import PerformanceChart from "../components/charts/PerformanceChart"
import SeverityChart from "../components/charts/SeverityChart"

export default function Analytics(){

return(

<div>

<h2>Analytics</h2>

<div className="chart-grid">

<HealthChart/>

<PerformanceChart/>

<SeverityChart/>

</div>

</div>

)
}