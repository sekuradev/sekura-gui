import React from "react";

var apiIntegration = require("../../services/integration");

export default class Integrations extends React.Component {
  constructor(props) {
    super(props);
    this.setServices = this.setServices.bind(this);
    this.state = {
      services: [],
    };
  }

  componentDidMount() {
    apiIntegration.getAvailableIntegrations().then((response) => {
      this.setServices(response.data.results);
    });
  }

  setServices(services) {
    this.setState({ services: services });
  }

  render() {
    return (
      <div>
        <h1>Integrations</h1>
        {this.state.msg}
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.services.map((service, i) => {
              return (
                <tr key={service.name}>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Add</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
