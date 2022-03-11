import axios from "axios";

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
    localStorage.setItem("access", response.access);
    localStorage.setItem("refresh", response.refresh);
  })
}
