import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.headers.common["Content-Type"] = "application/json";

const setAccessToken = (token) => {
  localStorage.setItem("access", token);
  axios.defaults.headers.common["Authorization"] =
    "Authorization: Bearer " + token;
};

const setRefreshToken = (token) => {
  localStorage.setItem("refresh", token);
};

export const login = async (user, password) => {
  return await axios
    .post("/api/token/", {
      username: user,
      password: password,
    })
    .then((response) => {
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
    })
    .catch((response) => {});
};

export const getUserId = () => {
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
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const refresh = async () => {
  return await axios
    .post("/api/token/refresh/", {
      access: localStorage.getItem("access"),
      refresh: localStorage.getItem("refresh"),
    })
    .then((response) => {
      if (response.data.access) {
        setAccessToken(response.data.access);
      }
      setRefreshToken(response.data.refresh);
    })
    .catch((response) => {});
};
