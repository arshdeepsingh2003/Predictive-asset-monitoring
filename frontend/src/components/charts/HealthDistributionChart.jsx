import ReactECharts from "echarts-for-react"

export default function HealthDistributionChart({engines}){

const normal = engines.filter(e=>e.severity==="NORMAL").length
const warning = engines.filter(e=>e.severity==="WARNING").length
const critical = engines.filter(e=>e.severity==="CRITICAL").length

const option = {

tooltip:{ trigger:"item" },

legend:{
bottom:0
},

series:[
{
type:"pie",
radius:"60%",
data:[
{value:normal,name:"Normal"},
{value:warning,name:"Warning"},
{value:critical,name:"Critical"}
],
label:{
formatter:"{b}: {d}%"
}
}
]

}

return <ReactECharts option={option}/>
}