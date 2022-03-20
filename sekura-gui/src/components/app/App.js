import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import Preferences from "../preferences/preferences";
import Integrations from "../integrations/integrations";
var apiSession = require("../../services/session");
var apiUser = require("../../services/user");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.refreshSessionToken = this.refreshSessionToken.bind(this);
    this.logout = this.logout.bind(this);
    this.handleOrganizationOnClick = this.handleOrganizationOnClick.bind(this);
    this.state = {
      user: null,
      organizations: null,
      organization: null,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.refreshSessionToken(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  refreshSessionToken() {
    apiSession.refresh();
  }

  logout() {
    apiSession.logout();
    this.handleLoginChange(null);
  }

  handleLoginChange(newUserId) {
    if (newUserId == null) {
      this.setState({ user: null });
      return;
    }
    apiUser.getCurrentUser().then((response) => {
      this.setState({ user: response.data });
      this.setState({ organizations: response.data.organizations });
      this.setState({ organization: response.data.organizations[0] });
    });
  }

  handleOrganizationOnClick(event) {
    if (this.state.organizations) {
      this.setState({
        organization: this.state.organizations.filter(
          (org) => org.id === event.target.dataset.id
        )[0],
      });
    }
  }

  render() {
    if (this.state.user == null) {
      return <Login handleLoginChange={this.handleLoginChange} />;
    }
    var listOrganizations = this.state.user.organizations.map((org) => (
      <li
        key={org.id}
        data-id={org.id}
        onClick={this.handleOrganizationOnClick.bind(this)}
        className="dropdown-item"
      >
        {org.name}
      </li>
    ));
    var currentOrganization = this.state.organization
      ? this.state.organization.name
      : "Select organization";
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-lg-2 d-md-block d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
              <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-4">
                  <b>SEKURA</b>
                </span>
              </a>
              <hr />
              <div className="btn-group dropend">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentOrganization}
                </button>
                <ul className="dropdown-menu">{listOrganizations}</ul>
              </div>

              <ul className="nav nav-pills flex-column mb-auto">
                <li>
                  <Link to="/dashboard" className="nav-link text-white">
                    <i className="bi bi-speedometer2"></i>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/access" className="nav-link text-white">
                    <i className="bi bi-person-circle"></i>
                    Access
                  </Link>
                </li>
                <li>
                  <Link to="/controls" className="nav-link text-white">
                    <i className="bi bi-table"></i>
                    Controls
                  </Link>
                </li>
                <li>
                  <Link to="/integrations" className="nav-link text-white">
                    <i className="bi bi-grid"></i>
                    Integrations
                  </Link>
                </li>
              </ul>
              <hr />
              <small className="fs-6 text-white text-decoration-none disabled">
                {this.state.user.username}
              </small>
              <hr />
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="fs-6 text-white btn btn-outline-secondary"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/access" element={<Preferences />} />
            <Route exact path="/controls" element={<Preferences />} />
            <Route exact path="/integrations" element={<Integrations />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
