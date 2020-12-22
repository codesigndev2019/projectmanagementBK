const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // leer el token del header
  const token = req.header("x-auth-token");
  // revisar si nohay token
  if (!token) {
    res.status(401).json({
      msg: "El usuario no se encuentra autorizado para realizar la consulta",
    });
  }
  // validar el token
  try {
    const tokenVerified = jwt.verify(token, process.env.SECRET);
    req.user = tokenVerified.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};
