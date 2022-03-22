function checkToken(req, res, next) {
  req.user = null;
  const token = req.session.token;
  if (token == null) {
    res.user = null;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || user == null) {
      req.user = null;
    } else {
      req.user = user.username;
    }
  });
  next();
}
