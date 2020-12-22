// rutas para crear tareas
const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// crear nueva tarea
// api/tasks
router.post(
  "/",
  auth,
  [
    check("taskName", "El nombre de la tarea es requerido").not().isEmpty(),
    check("project_Id", "El proyecto es obligatorio").not().isEmpty(),
  ],
  taskController.createTask
);

// obtener tareas de un proyecto
router.get("/", auth, taskController.getProjectTasks);

// Actualizamos una tarea

router.put("/:id", auth, taskController.updateProjectTask);

// eliminamos una tarea

router.delete("/:id", auth, taskController.deleteProjectTask);

module.exports = router;
