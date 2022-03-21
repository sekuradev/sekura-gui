var session = require("./session");

export function getAvailableIntegrations() {
  return session.getAxiosSession().get("/api/integration/available/");
}
