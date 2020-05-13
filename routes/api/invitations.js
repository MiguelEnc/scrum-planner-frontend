const router = require("express").Router();
const auth = require("../../middleware/auth");
const Invitation = require("../../models/Invitation");
const User = require("../../models/User");
const Project = require("../../models/Project");
const { check, validationResult } = require("express-validator");

/**
 * @route       GET api/invitations
 * @description Find pending invitations by user id
 * @access      Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    const invites = await Invitation.find({
      $and: [{ receiver: user.email }, { status: "Pending" }],
    });

    if (invites) {
      res.json({ invites });
    }

    res.json({ errors: [{ msg: "No invitations found" }] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route       GET api/invitations/:projectId
 * @description Find invitations by project id
 * @access      Private
 */
router.get("/:projectId", auth, async (req, res) => {
  try {
    const invites = await Invitation.find({ project: req.params.projectId });

    if (invites) {
      res.json({ invites });
    }

    res.json({ errors: [{ msg: "No invitations found" }] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route       POST api/invitations
 * @description Create or update Invitation
 * @access      Private
 */
router.post(
  "/",
  [
    auth,
    [
      check("receiver", "Receiver must be a valid email").isEmail(),
      check("projectId", "Project id is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { receiver, projectId, status } = req.body;
    const userId = req.user.id;

    try {
      let invitation = await Invitation.findOne({
        $and: [{ receiver }, { project: projectId }],
      });

      // Update
      if (invitation) {
        await Invitation.findOneAndUpdate(
          { $and: [{ receiver }, { project: projectId }] },
          { $set: status }
        );

        res.json(invitation);
      }

      // Create
      invitation = new Invitation({
        sender: userId,
        receiver,
        project: projectId,
        status: "Pending",
        sentDate: Date.now(),
      });

      await invitation.save();
      res.json(invitation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.delete(
  "/",
  [
    auth,
    [
      check("receiver", "Receiver must be a valid email").isEmail(),
      check("projectId", "Project is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { receiver, projectId } = req.body;

    const project = await Project.findOne({ _id: projectId });

    if (project.admins.includes(userId)) {
      await Invitation.findOneAndRemove({
        $and: [{ receiver }, { project: projectId }],
      });
      res.json({ errors: [{ msg: "Invitation deleted" }] });
    } else {
      res.status(401).send("Insufficient privileges to delete");
    }
  }
);

module.exports = router;
