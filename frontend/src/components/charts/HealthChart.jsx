import { LineChart,Line,XAxis,YAxis,Tooltip } from "recharts"

const data = [
{time:1,health:80},
{time:2,health:78},
{time:3,health:75},
{time:4,health:70},
]

export default function HealthChart(){

return(

<div className="chart-card">

<h4>Health Trend</h4>

<LineChart width={400} height={250} data={data}>
<XAxis dataKey="time"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="health" stroke="#4f46e5"/>
</LineChart>

</div>

)
}