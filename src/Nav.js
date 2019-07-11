import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "orange", height: 40 }}>
        <nav>
          <li>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
          </li>
        </nav>
      </div>
    );
  }
}

export default Nav;
