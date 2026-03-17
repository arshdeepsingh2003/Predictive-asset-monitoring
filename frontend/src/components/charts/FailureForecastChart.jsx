import ReactECharts from "echarts-for-react"

export default function FailureForecastChart({engines}){

// simulate future cycles
const cycles = ["+5","+10","+15","+20","+25"]

const forecast = cycles.map((_,i)=>{

  // simulate increasing failures
  const count = engines.filter(e =>
    e.predicted_rul < (i+1)*10
  ).length

  return count
})

const option = {

tooltip:{ trigger:"axis" },

xAxis:{
type:"category",
name:"Future Cycles",
data:cycles
},

yAxis:{
type:"value",
name:"Expected Failures"
},

series:[
{
data:forecast,
type:"line",
smooth:true,
areaStyle:{}
}
]

}

return <ReactECharts option={option}/>
}