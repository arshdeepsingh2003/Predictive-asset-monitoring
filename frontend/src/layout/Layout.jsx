import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({children,setPage}){

  return(
    <div className="layout">

      <Sidebar setPage={setPage}/>

      <div className="main">

        <Navbar/>

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  )
}