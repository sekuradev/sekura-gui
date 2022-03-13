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
var session = require("../../services/session");

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.refreshSessionToken = this.refreshSessionToken.bind(this);
    this.state = {
      userId: null,
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
    session.refresh();
  }

  handleLoginChange(newUserId) {
    this.setState({userId: newUserId});
    if (newUserId == null) {
      return
    }

  }

  render() {
    if (this.state.userId == null) {
      return (
        <Login handleLoginChange={this.handleLoginChange} />
      )
    }
    return (
      <div className="main">
        <Header userId={this.state.userId} handleLoginChange={this.handleLoginChange} />
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
