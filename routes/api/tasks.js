const router = require("express").Router();
const auth = require("../../middleware/auth");
const config = require("config");
const taskScores = config.get("taskScores");
const Task = require("../../models/Task");
const Project = require("../../models/Project");
const { check, validationResult } = require("express-validator");

/**
 * @route       GET api/tasks
 * @description Retrieve tasks by project
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

    const { projectId } = req.body;

    try {
      const tasks = await Task.find({ project: projectId }).select("-votes");
      res.json({ tasks });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route       GET api/tasks/:taskId
 * @description Calculate specified task's final score
 * @access      Private
 */
router.get("/:taskId", auth, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    let task = await Task.findById({ _id: taskId });
    const average = task.votes.reduce((a, b) => a + b, 0) / task.votes.length;
    let score = 0;

    // if average already in taskScores, use it
    if (taskScores.includes(average)) {
      score = average;
    } else {
      // identify the 2 values of taskScore that contains the average [x, y]
      const greaterIdx = taskScores.findIndex((s) => s > average);
      const lowerIdx = greaterIdx - 1;

      const x = taskScores[lowerIdx];
      const y = taskScores[greaterIdx];

      // find absolute value of substraction and user the lower one
      score = average - x < y - average ? x : y;
    }

    task = await Task.findOneAndUpdate(
      { _id: taskId },
      { score },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route       POST api/tasks
 * @description Create or update task
 * @access      Private
 */
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required"),
      check("projectId", "projectId is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, projectId, score, user, vote } = req.body;

    try {
      let task = await Task.findOne({
        $and: [{ title }, { project: projectId }],
      });

      // update
      if (task) {
        if (score) task.score = score;
        if (user) task.user = user;
        if (vote) task.votes = [...task.votes, vote];

        const updatedTask = await Task.findOneAndUpdate(
          { $and: [{ title }, { project: projectId }] },
          { $set: task },
          { new: true }
        );

        return res.json(updatedTask);
      }

      // create
      task = new Task({
        title,
        score: 0,
        created: Date.now(),
        project: projectId,
      });
      await task.save();
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route       DELETE api/tasks
 * @description Deletes a task
 * @access      Private
 */
router.delete(
  "/",
  [
    auth,
    [
      check("title", "Title is required"),
      check("projectId", "projectId is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(re);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, projectId } = req.body;
    const userId = req.user;

    try {
      const project = await Project.findById({ _id: projectId });
      if (project.admins.includes(userId)) {
        await Task.findOneAndRemove({
          $and: [{ title }, { project: projectId }],
        });
      } else {
        res.status(401).send("Insufficient privileges to delete");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
