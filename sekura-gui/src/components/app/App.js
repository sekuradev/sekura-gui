import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from '../login/login';
import Header from '../header/header';
import Dashboard from '../dashboard/dashboard';
import Preferences from '../preferences/preferences';
var apiSession = require("../../services/session");
var apiUser = require("../../services/user");

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.refreshSessionToken = this.refreshSessionToken.bind(this);
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.refreshSessionToken(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  refreshSessionToken() {
    apiSession.refresh();
  }

  handleLoginChange(newUserId) {
    if (newUserId == null) {
      this.setState({user: null});
      return
    }
    apiUser.getCurrentUser().then((response) => {
      console.log(response.data);
      this.setState({user: response.data});
    });
  }

  render() {
    if (this.state.user == null) {
      return (
        <Login handleLoginChange={this.handleLoginChange} />
      )
    }
    return (
      <Router>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar" _style="width: 280px;">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4"><b>SEKURA</b></span>
          </a>
          <hr/>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/preferences" className="nav-link active" aria-current="page">
                <i className="bi bi-house-door"></i>
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="nav-link text-white">
                <i className="bi bi-speedometer2"></i>
                Dashboard
              </Link>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <i className="bi bi-table"></i>
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <i className="bi bi-grid"></i>
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <i className="bi bi-person-circle"></i>
                Customers
              </a>
            </li>
          </ul>
          <hr/>
          <a href="#" class="d-flex align-items-center text-white text-decoration-none disabled">
            {this.state.user.username}
          </a>
        </div>
        <Routes>
          <Route exact path="/preferences" element={<Preferences/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    )
  }
}
