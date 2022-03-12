import React from 'react';
import bootstrap from 'bootstrap'

export default function Header() {
  return(
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
          <a className="navbar-brand" href="/"><b>SEKURA</b></a>
          <div className="d-flex">
            <button type="button" className="btn btn-outline-light me-2">Login</button>
            <button type="button" className="btn btn-warning">Sign-up</button>
          </div>
      </div>
    </nav>
  );
}

