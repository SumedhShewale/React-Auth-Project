import auth0 from "auth0-js";

const REDIRECT_PAGE = "redirectPage";

class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.requestedScopes = "openid profile email read:courses";
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: this.requestedScopes
    });
  }

  login = () => {
    localStorage.setItem(REDIRECT_PAGE, JSON.stringify(this.history.location));
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const redirectPage =
          localStorage.getItem(REDIRECT_PAGE) === null ||
          REDIRECT_PAGE === undefined
            ? "/"
            : JSON.parse(localStorage.getItem(REDIRECT_PAGE));
        this.history.push(redirectPage);
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check console for further details.`);
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_PAGE);
    });
  };

  //set the time that access token will expire and saving token details to local storage
  setSession = authResult => {
    //Unix Epoch Time Calculation below
    //authResult.expiresIn -> contains JWT expiration time in SECONDS
    //Converting to miliseconds and adding to current date time.
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    //using scopes if got from request if not then default scope or blank object
    const scopes = authResult.scope || this.requestedScopes || "";

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
  };

  isAuthenticated = () => {
    return (
      new Date().getTime() < JSON.parse(localStorage.getItem("expires_at"))
    );
  };

  logout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");

    this.userProfile = null;
    this.history.push("/");
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000"
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No Access Token Found.");
    }
    return accessToken;
  };

  getProfile = cb => {
    if (this.userProfile) {
      return cb(this.userProfile);
    }
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(profile, err);
    });
  };

  userHasScopes(scopes) {
    const grantedScopes = (
      JSON.parse(localStorage.getItem("scopes")) || ""
    ).split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}

export default Auth;
