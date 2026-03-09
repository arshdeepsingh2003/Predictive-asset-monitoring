import { PieChart,Pie,Cell,Tooltip } from "recharts"

const data = [
{name:"Normal",value:60},
{name:"Warning",value:25},
{name:"Critical",value:15}
]

const colors=["#22c55e","#f59e0b","#ef4444"]

export default function SeverityChart(){

return(

<div className="chart-card">

<h4>Severity Distribution</h4>

<PieChart width={400} height={250}>

<Pie data={data} dataKey="value" outerRadius={90}>

{data.map((entry,index)=>(
<Cell key={index} fill={colors[index]}/>
))}

</Pie>

<Tooltip/>

</PieChart>

</div>

)
}