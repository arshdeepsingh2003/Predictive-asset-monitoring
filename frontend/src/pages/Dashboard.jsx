import { useEffect, useState } from "react"
import { connectLive, disconnectLive } from "../services/socket"

import StatusSummary from "../components/cards/StatusSummary"
import EngineCard from "../components/cards/EngineCard"

export default function Dashboard(){

  const [engines, setEngines] = useState([])

  useEffect(()=>{

    connectLive((assets)=>{
      // assets is the array from websocket
      setEngines(assets)
    })

    return ()=>{
      disconnectLive()
    }

  },[])

  return(

    <div>

      <h2>AI Predictive Maintenance</h2>

      <StatusSummary engines={engines}/>

      <div className="engine-grid">

        {engines.map(engine=>(
          <EngineCard
            key={engine.engine_id}
            engine={engine}
          />
        ))}

      </div>

    </div>

  )

}