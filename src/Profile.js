import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      error: null
    };
  }

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile = () => {
    this.props.auth.getProfile((profile, error) => {
      this.setState({ profile, error });
    });
  };

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <div>
        <h1 style={{ padding: 20 }}>Profile</h1>
        <p>{profile.name}</p>
        <img
          style={{ height: 50, width: 50 }}
          src={profile.picture}
          alt="profile"
        />
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  }
}

export default Profile;
