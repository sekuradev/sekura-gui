import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap'
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

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.state = {
      logged: false,
    }
  }

  handleLoginChange(newState) {
    this.setState({logged: newState});
  }

  render() {
    if (! this.state.logged) {
      return (
        <Login handleLoginChange={this.handleLoginChange} />
      )
    }
    return (
      <div className="main">
        <Header/>
        <h1>Application</h1>
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
