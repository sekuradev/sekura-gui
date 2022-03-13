import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className="main">
        <Header user={this.state.user} handleLoginChange={this.handleLoginChange} />
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/preferences">Preferences</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
            <Routes>
              <Route exact path="/preferences" element={<Preferences/>}/>
              <Route exact path="/dashboard" element={<Dashboard/>}/>
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}
