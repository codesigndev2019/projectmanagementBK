// rutas para crear proyectos
const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
// Crear un proyecto
// api/projects
// post
router.post(
  "/",
  auth,
  [check("projectName", "El nombre del proyecto es requerido").not().isEmpty()],
  projectController.createProject
);
// consultar todos los proyectos
// api/projects
// get
router.get("/", auth, projectController.getProjects);
// Actualizar proyecto via ID
// api/projects
// put
router.put("/:id", auth, projectController.updateProject);

// Actualizar proyecto via ID
// api/projects
// delete
router.delete("/:id", auth, projectController.deleteProject);

module.exports = router;
