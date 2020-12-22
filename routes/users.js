// rutas para crear usuarios
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { check } = require("express-validator");
// Crear un usuario
// api/usuarios
router.post(
  "/",
  [
    check("name", "El nombre es requerido.").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  userController.createUser
);

module.exports = router;
