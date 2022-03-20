import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export function getAvailableIntegrations() {
  return axios.get("/api/integration/available/");
}
