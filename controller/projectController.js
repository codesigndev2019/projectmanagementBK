const { SchemaType } = require("mongoose");
const Project_Model = require("../models/projects");
const { validationResult } = require("express-validator");
const { request } = require("express");
exports.createProject = async (req, res) => {
  // revisamos si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { projectName } = req.body;
  try {
    let project = await Project_Model.findOne({ projectName });
    if (project) {
      return res
        .status(400)
        .json({ msg: "Ya existe un proyecto con ese nombre" });
    }

    // creamos un nuevo proyecto
    project = new Project_Model(req.body);
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// obtiene todos los proyectos del usuario actual

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project_Model.find().sort({ creation_Date: -1 });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Actualiza un proyecto por el id

exports.updateProject = async (req, res) => {
  // revisamos si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // extraer info del proyecto
  const { name, id } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    // revisar ID
    let projectId = await Project_Model.findById(req.params.id);
    // validamos si el proyecto existe
    if (!projectId) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // actualizamos el proyecto
    projectId = await Project_Model.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );
    res.json({ projectId });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Elimina un proyecto por el id

exports.deleteProject = async (req, res) => {
  // revisamos si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // revisar ID
    let projectId = await Project_Model.findById(req.params.id);
    // validamos si el proyecto existe
    if (!projectId) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // eliminamos el proyecto
    projectId = await Project_Model.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
