const router = require("express").Router();
const auth = require("../../middleware/auth");
const Project = require("../../models/Project");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

/**
 * @route       GET api/projects
 * @description Retrieves projects of the given user
 * @access      Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const projects = await Project.find({
      $or: [{ users: id }, { admins: id }],
    })
      .populate("users", "name email")
      .populate("admins", "name email");

    if (!projects) {
      return res.status(400).json({ msg: "No projects found." });
    }

    res.json(projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route       POST api/projects
 * @description Create or update project
 * @access      Private
 */
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const { id } = req.user;

    try {
      let project = await Project.findOne({ $and: [{ name }, { users: id }] });

      if (project) {
        return res
          .status(400)
          .send("User already belong to a project with same name");
      }

      // Create project
      project = new Project({
        name,
        users: [id],
        admins: [id],
      });
      await project.save();

      // Add project to user
      let user = await User.findById({ id });
      await User.findOneAndUpdate(
        { _id: id },
        { projects: [...user.projects, project.id] }
      );

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

/**
 * @route       DELETE api/projects
 * @description Delete a post
 * @access      Private
 */
router.delete(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const { id } = req.user;

    try {
      // Logged user must be admin of the project
      const project = await Project.findById({
        $and: [{ _id: projectId }, { admins: id }],
      });

      if (project) {
        // Remove project
        await Project.findOneAndRemove({ $and: [{ name }, { admins: id }] });

        // Remove project to user
        let user = await User.findById({ id });
        let updatedProjects = user.projects.filter((p) => p !== project.id);
        await User.findOneAndUpdate(
          { _id: id },
          { projects: [updatedProjects] }
        );
        res.json({ msg: "Project deleted" });
      } else {
        res.status(401).send("Insufficient privileges to delete project");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route       POST api/projects/remove/
 * @description Remove user from project
 * @access      Private
 */
router.post(
  "/remove",
  [
    auth,
    check("projectId", "projectId is required"),
    check("userId", "user is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectId, userId } = req.body;

    try {
      // Logged user must be admin of the project
      const project = await Project.findById({
        $and: [{ _id: projectId }, { admins: req.user.id }],
      });

      if (project) {
        const user = await User.findById({ _id: userId });
        let updatedProjects = user.projects.filter((p) => p !== projectId);
        await User.findOneAndUpdate(
          { _id: userId },
          { projects: [updatedProjects] }
        );
        res.json({ msg: "User removed" });
      } else {
        res.status(401).send("Insufficient privileges to remove user");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
