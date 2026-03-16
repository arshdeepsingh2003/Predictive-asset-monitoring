import { LayoutDashboard, Bell, BarChart3, Cpu } from "lucide-react"

export default function Sidebar({ setPage }){

  return(

    <div className="sidebar">

      <h2 className="logo">PredictiveAI</h2>

      <ul>

        <li onClick={() => setPage("dashboard")}>
          <LayoutDashboard size={18}/> Dashboard
        </li>

        <li onClick={() => setPage("assets")}>
          <Cpu size={18}/> Assets
        </li>

        <li onClick={() => setPage("alerts")}>
          <Bell size={18}/> Alerts
        </li>

        <li onClick={() => setPage("analytics")}>
          <BarChart3 size={18}/> Analytics
        </li>

      </ul>

    </div>

  )
}