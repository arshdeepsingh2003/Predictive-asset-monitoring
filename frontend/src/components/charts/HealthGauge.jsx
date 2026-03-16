import ReactECharts from "echarts-for-react"

export default function HealthGauge({value}){

const option = {

series:[
{
type:"gauge",

radius:"95%",

progress:{
show:true,
width:20
},

axisLine:{
lineStyle:{
width:20
}
},

detail:{
fontSize:32,
formatter:"{value}%"
},

data:[
{
value:(value*100).toFixed(0)
}
]
}
]
}

return(

<div style={{width:"100%"}}>

<h3 style={{marginBottom:"5px"}}>Average Asset Health</h3>

<ReactECharts
option={option}
style={{height:200}}
/>

</div>

)
}