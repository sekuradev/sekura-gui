import React from 'react';
import bootstrap from 'bootstrap'

export default function Header() {
  return(
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
          <a class="navbar-brand" href="/"><b>SEKURA</b></a>
          <div class="d-flex">
            <button type="button" class="btn btn-outline-light me-2">Login</button>
            <button type="button" class="btn btn-warning">Sign-up</button>
          </div>
      </div>
    </nav>
  );
}

