import React from 'react';
import bootstrap from 'bootstrap'
import './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    return (
      <div class="login">
        <div class="form-signin text-center">
          <form onSubmit={this.handleSubmit}>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
              <input type="email" class="form-control" id="email" placeholder="name@example.com" onChange={this.handleChangeUsername}/>
              <label for="email">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="Password" placeholder="Password" onChange={this.handleChangePassword}/>
              <label for="Password">Password</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
          </form>
        </div>
      </div>
    )
  }
}
