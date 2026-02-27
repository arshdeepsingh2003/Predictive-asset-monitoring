import api from "./api";

export const predictEngine = (data) => {
  return api.post("/predict", data);
};