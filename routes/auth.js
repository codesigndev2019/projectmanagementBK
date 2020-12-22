// rutas para crear usuarios
const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
// Iniciar sesion
// api/auth
router.post(
  "/",
  [
    check("email", "Agrega un email válido").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  authController.authUser
);

// Obtiene el usuario autenticado
router.get("/", auth, authController.authenticatedUser);

module.exports = router;
