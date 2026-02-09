const express = require("express");
const auth = require("../middleware/auth");
const {
  createProject,
  getProjects,
  deleteProject
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.delete("/:id", auth, deleteProject);

module.exports = router;
