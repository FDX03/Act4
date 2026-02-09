const Project = require("../models/project");

exports.createProject = async (req, res) => {
  const project = new Project({
    ...req.body,
    owner: req.user.id
  });

  await project.save();
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user.id });
  res.json(projects);
};

exports.deleteProject = async (req, res) => {
  await Project.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id
  });

  res.json({ message: "Proyecto eliminado" });
};
