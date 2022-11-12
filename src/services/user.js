var session = require("./session");

export function getCurrentUser(userId) {
  return session.getAxiosSession().get("/api/user/");
}
