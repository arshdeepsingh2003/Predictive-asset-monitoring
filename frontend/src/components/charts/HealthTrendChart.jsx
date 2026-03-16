import ReactECharts from "echarts-for-react"

export default function HealthTrendChart({engines}){

const data = engines.slice(0,20).map(e => (e.health_index*100).toFixed(0))

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
name:"Health Index (%)",
nameLocation:"middle",
nameGap:45
},

series:[
{
data:data,
type:"line",
smooth:true
}
]

}

return <ReactECharts option={option}/>
}