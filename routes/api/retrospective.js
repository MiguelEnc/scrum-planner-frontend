const router = require("express").Router();
const auth = require("../../middleware/auth");
const Retrospective = require("../../models/Retrospective");
const Project = require("../../models/Project");
const { check, validationResult, body } = require("express-validator");

/**
 * @route       GET api/retrospective
 * @description Retrieve retrospectives by project
 * @access      Private
 */
router.get(
  "/",
  [auth, check("projectId", "projectId required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const retrospectives = await Retrospective.find({
        project: req.body.projectId,
      }).populate("columns.comments.user", "name");
      res.json(retrospectives);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route       POST api/retrospective
 * @description Create or update retrospective
 * @access      Private
 */
router.post(
  "/",
  [
    auth,
    [
      body("title", "title is required")
        .if(body("retrospectiveId").not().exists())
        .not()
        .isEmpty(),
      body("projectId", "projectId is required")
        .if(body("retrospectiveId").not().exists())
        .not()
        .isEmpty(),
      body("columnId", "columnId is required to add comment")
        .if(body("comment").not().isEmpty())
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      projectId,
      active,
      columns,
      comment,
      columnId,
      retrospectiveId,
    } = req.body;

    try {
      // Editing
      if (retrospectiveId) {
        let updates = {};
        if (title) updates.title = title;
        if (active) updates.active = active;
        if (columns) updates.columns = columns;

        if (comment) {
          const current = await Retrospective.findById(retrospectiveId);
          updates.columns = current.columns.slice();
          const column = updates.columns.find((c) => c._id == columnId);
          column.comments.unshift(comment);
        }

        let updated = await Retrospective.findByIdAndUpdate(
          retrospectiveId,
          { $set: updates },
          { new: true }
        );

        return res.json(updated);
      }

      // Create
      retrospective = new Retrospective({
        title,
        creationDate: Date.now(),
        project: projectId,
        active: true,
        columns,
      });

      retrospective.save();
      res.json(retrospective);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route       DELETE api/retrospective
 * @description Deletes a Retrospective
 * @access      Private
 */
router.delete(
  "/",
  [auth, check("retrospectiveId", "retrospectiveId required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const { retrospectiveId } = req.body;

      const retrospective = await Retrospective.findById(retrospectiveId);

      const project = await Project.findOne({ _id: retrospective.project });
      if (project.admins.includes(userId)) {
        await Retrospective.findByIdAndRemove(retrospectiveId);
        res.json({ msg: "Retrospective deleted" });
      } else {
        res.status(401).send("Insufficient privileges to delete");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
