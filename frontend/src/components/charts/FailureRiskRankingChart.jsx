import ReactECharts from "echarts-for-react"

export default function FailureRiskRankingChart({engines}){

const sorted = [...engines]
.sort((a,b)=>a.health_index-b.health_index)
.slice(0,10)

const option = {

tooltip:{ trigger:"axis" },

xAxis:{
type:"value",
name:"Failure Risk (%)",
nameLocation:"middle",
nameGap:35
},

yAxis:{
type:"category",
name:"Engine ID",
nameLocation:"middle",
nameGap:50,
data: sorted.map(e => "E"+e.engine_id)
},

series:[
{
type:"bar",
data: sorted.map(e => ((1-e.health_index)*100).toFixed(0))
}
]

}

return <ReactECharts option={option}/>
}