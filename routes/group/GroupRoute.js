const express = require("express");
const router = express.Router();

const groupController = require("../../controllers/group_controllers");

// Get all group names
router.get("/", (req, res) => {
  groupController.groupsGetAll(req, res);
});

// Create a new group
router.post("/", (req, res) => {
  groupController.groupNewGroup(req, res);
});

// Update keyword of group
router.patch("/:groupID", (req, res) => {
  groupController.groupNewGroup(req, req);
});

// Delete a group
router.delete("/:groupID", (req, res) => {
  groupController.groupDelete(req, res);
});

module.exports = router;
