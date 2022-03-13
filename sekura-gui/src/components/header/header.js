import React from 'react';
var session = require("../../services/session/session");

export default class Header extends React.Component{
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.state = {
      userId: props.userId,
    }
  }

  logout() {
    session.logout();
    this.props.handleLoginChange(false);
  }

  render() {
    return(
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/"><b>SEKURA</b></a>
            <div className="d-flex">
              <span className="nav-link disabled">{this.props.userId}</span>
              <button type="button" className="btn btn-outline-light me-2" onClick={this.logout}>Logout</button>
            </div>
        </div>
      </nav>
    );
  }
}
