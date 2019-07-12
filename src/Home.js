import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <h1 style={{ padding: 20 }}>Home</h1>
        {isAuthenticated() ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <button onClick={login}>LogIn</button>
        )}
      </div>
    );
  }
}

export default Home;
