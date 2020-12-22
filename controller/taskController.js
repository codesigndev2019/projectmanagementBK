const { SchemaType } = require("mongoose");
const Task_Model = require("../models/task");
const Project_Model = require("../models/projects");
const { validationResult } = require("express-validator");
const { request } = require("express");

exports.createTask = async (req, res) => {
  // revisamos si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // validamos la existencia del proyecto
  const { project_Id } = req.body;
  const project = await Project_Model.findById(project_Id);
  if (!project) {
    return res.status(404).json({ msg: "Proyecto no encontrado" });
  }

  try {
    // creamos la tarea

    const task = new Task_Model(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// obtiene tareas por proyecto
exports.getProjectTasks = async (req, res) => {
  try {
    // validamos la existencia del proyecto
    const { project_Id } = req.query;
    const project = await Project_Model.findById(project_Id);
    if (!project) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // obtener las tareas por proyecto
    const project_Tasks = await Task_Model.find({ project_Id });

    res.json({ project_Tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// Actualizamos una tarea

exports.updateProjectTask = async (req, res) => {
  try {
    // validamos la existencia del proyecto
    const { taskName, status } = req.body;

    let task = await Task_Model.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrado" });
    }

    // creamos objeto con nueva info
    const newTask = {};
    newTask.taskName = taskName;
    newTask.status = status;

    task = await Task_Model.findByIdAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });

    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// eliminamos una tarea

exports.deleteProjectTask = async (req, res) => {
  try {
    // validamos la existencia del proyecto
    let task = await Task_Model.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrado" });
    }

    task = await Task_Model.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};
