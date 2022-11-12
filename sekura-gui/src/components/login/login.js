import React, { useState, useRef } from "react";
import "./login.css";
var session = require("../../services/session");

export default function Login(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [lastError, setLastError] = useState("");
  props.handleLoginChange(session.getUserId());

  const handleSubmit = (event) => {
    event.preventDefault();
    session
      .login(usernameRef.current.value, passwordRef.current.value)
      .then((p) => {
        props.handleLoginChange(session.getUserId());
      })
      .catch((error) => {
        console.log(error);
        setLastError(error.toString());
      });
  };

  return (
    <div className="login">
      <div className="form-signin text-center">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal" id="title">
            Please sign in
          </h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              ref={usernameRef}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="Password"
              placeholder="Password"
              ref={passwordRef}
            />
            <label htmlFor="Password">Password</label>
          </div>
          <p className="Invalid Feedback">{lastError}</p>

          <button
            id="submit"
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
        </form>
      </div>
    </div>
  );
}
