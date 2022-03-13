import React from 'react';
var session = require("../../services/session");

export default class Header extends React.Component{
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.state = {
      user: props.user,
    }
    console.log(this.state);
  }

  getUsername() {
    if (this.state.user == null) {
      return null;
    }
    return this.state.user.username;
  }

  logout() {
    session.logout();
    this.props.handleLoginChange(null);
  }

  render() {
    return(
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" _style="width: 280px;">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">Sidebar</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <i className="bi bi-house-door"></i>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </a>
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
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>{this.getUsername()}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    );
    return(
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/"><b>SEKURA</b></a>
            <div className="d-flex">
              <span className="nav-link disabled">{this.getUsername()}</span>
              <button type="button" className="btn btn-outline-light me-2" onClick={this.logout}>Logout</button>
            </div>
        </div>
      </nav>
    );
  }
}
