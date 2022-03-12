import axios from "axios";
import jwt_decode from 'jwt-decode';

export function login(user, password) {
  return axios.post("/api/token/", {
    username: user,
    password: password,
  },{
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log(response);
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
  })
}

export function isLogged() {
  try {
    var access = localStorage.getItem("access");
    console.log(access);
    var decoded = jwt_decode(access);
    console.log(decoded);
    if (Date.now() > decoded.exp * 1000) {
      return false;
    }
    return true;
  } catch (error){
    console.error(error);
    return false;
  }
}
