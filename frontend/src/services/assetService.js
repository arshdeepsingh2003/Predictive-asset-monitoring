import { api } from "./api"

// get all engines
export const getAssets = async () => {
  try {
    const res = await api.get("/assets")
    return res.data
  } catch (err) {
    console.error("Assets API error:", err)
    return []
  }
}

// get alerts
export const getAlerts = async () => {
  try {
    const res = await api.get("/alerts")
    return res.data
  } catch (err) {
    console.error("Alerts API error:", err)
    return []
  }
}