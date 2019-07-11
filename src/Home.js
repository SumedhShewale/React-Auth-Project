import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h1 style={{ padding: 20 }}>Home</h1>
        <button onClick={this.props.auth.login}>LogIn</button>
      </div>
    );
  }
}

export default Home;
