import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;
    return (
      <div style={{ backgroundColor: "orange", height: 40 }}>
        <nav>
          <li>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/public">Public</Link>
            {isAuthenticated() && <Link to="/private">Private</Link>}
            {isAuthenticated() && userHasScopes(["read:courses"]) && (
              <Link to="/course">Courses</Link>
            )}
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
