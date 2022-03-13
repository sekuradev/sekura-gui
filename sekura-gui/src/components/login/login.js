import React from 'react';
import './login.css';
var session = require("../../services/session");

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      lastError: "",
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.props.handleLoginChange(session.getUserId());
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    session.login(
      this.state.username,
      this.state.password,
    )
    .then((p) => {
      this.props.handleLoginChange(session.getUserId());
    })
    .catch((error) => {
      console.log(error);
      this.setState({lastError: error.toString()});
    })
    ;
  }

  render() {
    return (
      <div className="login">
        <div className="form-signin text-center">
          <form onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={this.handleChangeUsername}/>
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="Password" placeholder="Password" onChange={this.handleChangePassword}/>
              <label htmlFor="Password">Password</label>
            </div>
            <p className="Invalid Feedback">{this.state.lastError}</p>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
          </form>
        </div>
      </div>
    )
  }
}
