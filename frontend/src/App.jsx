import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Assets from "./pages/Assets";

import { useState } from "react";

export default function App() {

  const [page, setPage] = useState("dashboard");

  const renderPage = () => {

    switch(page){
      case "alerts":
        return <Alerts/>
      case "analytics":
        return <Analytics/>
      case "assets":
        return <Assets/>
      default:
        return <Dashboard/>
    }
  }

  return (
    <Layout setPage={setPage}>
      {renderPage()}
    </Layout>
  );
}