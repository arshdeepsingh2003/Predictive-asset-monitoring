import { api } from "./api"

export async function getAssets(){

const res = await api.get("/assets")

return res.data

}

export async function getAlerts(){

const res = await api.get("/alerts")

return res.data

}