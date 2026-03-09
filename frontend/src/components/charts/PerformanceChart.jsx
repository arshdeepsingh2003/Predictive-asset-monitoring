import { AreaChart,Area,XAxis,YAxis,Tooltip } from "recharts"

const data = [
{t:1,v:60},
{t:2,v:70},
{t:3,v:65},
{t:4,v:80}
]

export default function PerformanceChart(){

return(

<div className="chart-card">

<h4>Performance</h4>

<AreaChart width={400} height={250} data={data}>
<XAxis dataKey="t"/>
<YAxis/>
<Tooltip/>
<Area type="monotone" dataKey="v" stroke="#22c55e" fill="#22c55e"/>
</AreaChart>

</div>

)
}