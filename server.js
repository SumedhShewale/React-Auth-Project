const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); //Validate jwt and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from JSON web key set (JWKS)
const checkScope = require("express-jwt-authz"); //Validate JWT scopes

const checkJwt = jwt({
  // Dynamically  provide signing key based on the kId in header and the signing keys provided by the JWKS
  secret: jwksRsa.expressJwtSecret({
    cache: true, // caching the key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevents user/attacker from requesting more than 5 per minute
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),

  //Validate the audience and the issuer
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  //Algoroithm used/selected at Auth0 dashboard
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API!"
  });
});

app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from a private API!"
  });
});

app.get("/course", checkJwt, checkScope(["read:courses"]), function(req, res) {
  res.json({
    courses: [
      { id: 1, title: "COURSE TITLE 1" },
      { id: 2, title: "COURSE TITLE 2" }
    ]
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
