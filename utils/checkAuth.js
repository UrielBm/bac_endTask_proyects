const jwt = require("jsonwebtoken");
const checkAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "falta de token, debe de loguarse" });
  }
  try {
    const cifrado = jwt.verify(token, "3sS3cr3ta");
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    return res.status(401).json({ msg: `Token no válido` });
  }
};

module.exports = checkAuth;
