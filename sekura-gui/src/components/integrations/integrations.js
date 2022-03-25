import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
var apiIntegration = require("../../services/integration");

export default function Integrations(props) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    apiIntegration.getAvailableIntegrations().then((response) => {
      setServices(response.data.results);
    });
  });

  return (
    <div>
      <h1>Integrations</h1>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service, i) => {
            return (
              <tr key={service.name}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>
                  <AddButton service={service.name}>Add</AddButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function AddButton(props) {
  return (
    <Link
      to={{ pathname: `/integrations_add/${props.service}` }}
      className="btn btn-primary btn-sm"
    >
      Add
    </Link>
  );
}
