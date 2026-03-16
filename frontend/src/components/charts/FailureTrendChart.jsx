import ReactECharts from "echarts-for-react"

export default function FailureTrendChart({engines}){

const risk = engines.slice(0,20).map(e =>
((1-e.health_index)*100).toFixed(0)
)

const option = {

tooltip:{ trigger:"axis" },

xAxis:{
type:"category",
name:"Engine ID",
nameLocation:"middle",
nameGap:30,
data: engines.slice(0,20).map(e => "E"+e.engine_id)
},

yAxis:{
type:"value",
name:"Failure Probability (%)",
nameLocation:"middle",
nameGap:45
},

series:[
{
data:risk,
type:"line",
areaStyle:{}
}
]

}

return <ReactECharts option={option}/>
}