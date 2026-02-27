import { useEffect, useState } from "react";
import { getAssets } from "../services/assetService";
import EngineCard from "../components/cards/EngineCard";

const Assets = () => {

  const [assets,setAssets]=useState([]);

  useEffect(()=>{
    getAssets().then(res=>setAssets(res.data));
  },[]);

  return (
    <>
      <h1>Assets</h1>

      <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>
        {assets.map(a=>(
          <EngineCard key={a.engine_id} engine={a}/>
        ))}
      </div>
    </>
  );
};

export default Assets;