import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <div style={{ backgroundColor: "orange", height: 40 }}>
        <nav>
          <li>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "LOGOUT" : "LOGIN"}
            </button>
          </li>
        </nav>
      </div>
    );
  }
}

export default Nav;
