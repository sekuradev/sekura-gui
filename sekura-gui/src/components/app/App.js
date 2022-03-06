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

function App() {
  return (
    <Login/>
  )
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

export default App;
