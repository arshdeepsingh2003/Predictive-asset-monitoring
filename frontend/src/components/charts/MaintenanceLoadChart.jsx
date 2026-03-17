import ReactECharts from "echarts-for-react"

export default function MaintenanceLoadChart({engines}){

let immediate = 0
let soon = 0
let later = 0

engines.forEach(e=>{

  const rul = e.predicted_rul

  if(rul < 20) immediate++
  else if(rul < 50) soon++
  else later++

})

const option = {

tooltip:{ trigger:"item" },

xAxis:{
type:"category",
name:"Maintenance Timeline",
data:["Immediate","Soon","Later"]
},

yAxis:{
type:"value",
name:"Number of Assets"
},

series:[
{
type:"bar",
data:[
  {value:immediate, itemStyle:{color:"#ef4444"}},
  {value:soon, itemStyle:{color:"#f59e0b"}},
  {value:later, itemStyle:{color:"#22c55e"}}
],
barWidth:"40%"
}
]

}

return <ReactECharts option={option}/>
}