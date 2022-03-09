import axios from "axios";

export default class Session{
  login(user, password, success, failure) {
    axios.post("/api/token/", {
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
      if (success) {
        success();
      }
    })
    .catch((error) => {
      localStorage.setItem("access", null);
      if (failure) {
        failure(error);
      }
    })
  }
}
