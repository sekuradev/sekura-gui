var session = require("./session");

export function getAvailableIntegrations() {
  return session.getAxiosSession().get("/api/integrationavailable/");
}

export function getIntegrations(org) {
  return session
    .getAxiosSession()
    .get("/api/organization/" + org + "/integration/");
}
