import React, { useState } from "react";
import { useParams } from "react-router-dom";

var apiIntegration = require("../../services/integration");

export default function IntegrationAdd(props) {
  const params = useParams();

  return (
    <div>
      <h1>Integration Configuration for {params.kind}</h1>
    </div>
  );
}
