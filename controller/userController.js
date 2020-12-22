const user_Model = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  // revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extraer email y password
  const { email, password } = req.body;

  try {
    let user = await user_Model.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ msg: "El correo ya se encuentra registrado" });
    }
    // creamos la instancia de usuario
    user = new user_Model(req.body);

    // hashear el pass
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // Guardamos el usuario
    await user.save();
    // crear y firmar el JWT
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
        res.json({ token });
      }
    );
    // mensaje de confirmacion
   // res.json({ msg: "Usuario creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
