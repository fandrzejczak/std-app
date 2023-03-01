import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Opinie samochodowe</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Opinie</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Utwórz nową opinię</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Utwórz nowe konto</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}