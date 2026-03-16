import { useEffect, useState } from "react"
import { connectLive, disconnectLive } from "../services/socket"

import "../styles/components/assets.css"

export default function Assets(){

  const [assets,setAssets] = useState([])
  const [search,setSearch] = useState("")
  const [severity,setSeverity] = useState("ALL")

  const [sortKey,setSortKey] = useState("engine_id")
  const [sortAsc,setSortAsc] = useState(true)

  const [page,setPage] = useState(1)

  const itemsPerPage = 10

  const [selected,setSelected] = useState(null)

  useEffect(()=>{

    connectLive((data)=>{
      setAssets(data)
    })

    return ()=> disconnectLive()

  },[])

  // filtering
  let filtered = assets.filter(asset => {

    const matchSearch =
      asset.engine_id.toString().includes(search)

    const matchSeverity =
      severity === "ALL" ||
      asset.severity === severity

    return matchSearch && matchSeverity

  })


  // sorting
  filtered.sort((a,b)=>{

    if(sortAsc)
      return a[sortKey] > b[sortKey] ? 1 : -1

    else
      return a[sortKey] < b[sortKey] ? 1 : -1

  })


  // pagination
  const start = (page-1)*itemsPerPage
  const end = start + itemsPerPage

  const paginated = filtered.slice(start,end)

  const totalPages = Math.ceil(filtered.length/itemsPerPage)


  function changeSort(key){

    if(key === sortKey)
      setSortAsc(!sortAsc)
    else{
      setSortKey(key)
      setSortAsc(true)
    }

  }

  return(

    <div className="assets-page">

      <h2>Assets</h2>


      {/* Filters */}

      <div className="assets-controls">

        <input
          placeholder="Search Engine ID"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <select
          value={severity}
          onChange={(e)=>setSeverity(e.target.value)}
        >

          <option value="ALL">All</option>
          <option value="NORMAL">Normal</option>
          <option value="WARNING">Warning</option>
          <option value="CRITICAL">Critical</option>

        </select>

      </div>


      {/* Table */}

      <table className="assets-table">

        <thead>

          <tr>

            <th onClick={()=>changeSort("engine_id")}>
              Engine {sortKey==="engine_id" && (sortAsc ? "▲" : "▼")}
            </th>

            <th onClick={()=>changeSort("cycle")}>
              Cycle {sortKey==="cycle" && (sortAsc ? "▲" : "▼")}
            </th>

            <th onClick={()=>changeSort("predicted_rul")}>
              RUL {sortKey==="predicted_rul" && (sortAsc ? "▲" : "▼")}
            </th>

            <th onClick={()=>changeSort("severity")}>
              Severity {sortKey==="severity" && (sortAsc ? "▲" : "▼")}
            </th>

            <th>
              Details
            </th>

          </tr>

        </thead>


        <tbody>

          {paginated.map(asset=>(

            <tr
              key={asset.engine_id}
              className={`row-${asset.severity.toLowerCase()}`}
            >

              <td className="engine-cell">

                <span className={`status-dot ${asset.severity.toLowerCase()}`}></span>

                Engine {asset.engine_id}

              </td>

              <td>{asset.cycle}</td>

              <td>{Math.round(asset.predicted_rul)}</td>

              <td>

                <span
                  className={`badge ${asset.severity.toLowerCase()}`}
                >

                  {asset.severity}

                </span>

              </td>


              <td>

                <button
                  className="view-btn"
                  onClick={()=>setSelected(asset)}
                >

                  View

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* Pagination */}

      <div className="pagination">

        {Array.from({length:totalPages},(_,i)=>(

          <button
            key={i}
            onClick={()=>setPage(i+1)}
            className={page===i+1?"active":""}
          >

            {i+1}

          </button>

        ))}

      </div>


      {/* Modal */}

      {selected && (

        <div className="modal">

          <div className="modal-content">

            <h3>Engine {selected.engine_id}</h3>

            <p>Cycle: {selected.cycle}</p>
            <p>RUL: {selected.predicted_rul}</p>
            <p>Severity: {selected.severity}</p>

            <button
              onClick={()=>setSelected(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  )

}