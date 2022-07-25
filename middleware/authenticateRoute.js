const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const config = require("../config/index");

module.exports = {
  authentication(req, res, next) {
    function getToken(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      return null;
    }

    var token = getToken(req);

    var sign = config.privateKey;

    var decode=jwt.decode(token, (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log(decode)

    jwt.verify(token, sign, function (err, decoded) {
      if (err) {
        console.log("invalid token", err);
        res.send(403);
      } else {
        req.user = decoded;
        console.log("user verified");
        next();
      }
    });
  },
};