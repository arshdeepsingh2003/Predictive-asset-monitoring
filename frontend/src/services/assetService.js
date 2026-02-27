import api from "./api";

export const getAssets = () => {
  return api.get("/assets");
};

export const getAlerts = () => {
  return api.get("/alerts");
};