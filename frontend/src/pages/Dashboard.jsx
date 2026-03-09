import { useEffect, useState } from "react";
import EngineCard from "../components/cards/EngineCard";
import StatusCard from "../components/cards/StatusCard";
import { connectLive } from "../services/socket";

export default function Dashboard(){

const [engines,setEngines] = useState([])

useEffect(()=>{

connectLive((data)=>{
setEngines(data.assets)
})

},[])

return(

<div>

<div className="status-grid">

<StatusCard title="Total Engines" value={engines.length}/>
<StatusCard title="Critical" value={engines.filter(e=>e.severity==="CRITICAL").length}/>
<StatusCard title="Warning" value={engines.filter(e=>e.severity==="WARNING").length}/>
<StatusCard title="Healthy" value={engines.filter(e=>e.severity==="NORMAL").length}/>

</div>

<div className="engine-grid">

{engines.map(engine=>(
<EngineCard key={engine.engine_id} engine={engine}/>
))}

</div>

</div>

)
}