import axios from "axios";

axios.defaults.headers.common['Content-Type'] = "application/json";

export function getCurrentUser(userId) {
  return axios.get("/api/user/");
}
