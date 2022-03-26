import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.headers.common["Content-Type"] = "application/json";

export function login(user, password) {
  return axios
    .post("/api/token/", {
      username: user,
      password: password,
    })
    .then((response) => {
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access;
    });
}

export function getUserId() {
  try {
    var access = localStorage.getItem("access");
    var decoded = jwt_decode(access);
    if (Date.now() > decoded.exp * 1000) {
      return null;
    }
    return decoded.user_id;
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export function refresh() {
  console.log("refreshing:" + new Date());
  return axios
    .post("/api/token/refresh/", {
      access: localStorage.getItem("access"),
      refresh: localStorage.getItem("refresh"),
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("access", response.data.access);
        axios.defaults.headers.common["Authorization"] =
          "Authorization: Bearer " + response.data.access;
      }
      if (response.data.refresh) {
        localStorage.setItem("refresh", response.data.refresh);
      }
    });
}

export function getAxiosSession() {
  return axios.create();
}
