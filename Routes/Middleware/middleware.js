const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;
    console.log(token);
    jwt.verify(token, "NEW", (err, user) => {
      console.log(user);
      if (err) {
        return res.sendStatus(403);
      }
      if (user.id === req.params.id) {
        next();
      } else {
        return res.sendStatus(403);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJWT,
};