import AlertsTable from "../tables/AlertsTable"
import { useEffect, useState } from "react"
import { getAlerts } from "../services/assetService"

export default function Alerts(){

const [alerts,setAlerts] = useState([])

useEffect(()=>{

async function loadAlerts(){

try{

const data = await getAlerts()

if(Array.isArray(data)){
setAlerts(data)
}else{
setAlerts([])
}

}catch(err){
console.error("Alert fetch error",err)
setAlerts([])
}

}

loadAlerts()

},[])

return(

<div>

<h2>Alerts</h2>

<AlertsTable alerts={alerts}/>

</div>

)

}