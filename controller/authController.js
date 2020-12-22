const user_Model = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  // revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extraer email y password
  const { email, password } = req.body;
  try {
    let user = await user_Model.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "El usuario o contraseña son incorrectos" });
    }
    let passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res
        .status(400)
        .json({ msg: "El usuario o contraseña son incorrectos" });
    }
    // si todo es correcto creamos el JWT

    const payload = {
      user: {
        id: user.id,
      },
    };
    // firmamos el jwt
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600, // 1h
      },
      (error, token) => {
        if (error) throw error;
        res.json({ user, token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// obtiene el usuario autenticado

exports.authenticatedUser = async (req, res) => {
  try {
    const userInfo = await user_Model.findById(req.user.id).select("-password");
    res.json({ userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
