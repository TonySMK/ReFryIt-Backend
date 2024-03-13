const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

// Get all group names
router.get("/", (req, res) => {
  knex
    .from("group")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
});

// Create a new group
router.post("/", (req, res) => {
  const newGroupData = req.body;

  const { keyword, ...others } = newGroupData;
  const otherattributearray = Object.keys(others);
  console.log(keyword);

  if ((!keyword, otherattributearray != 0)) {
    // FIXME: do we need to do somesort of validation when an object is passed but no key is provided?
    res.status(406).send("Incorrect inputs");
  } else {
    knex
      .from("group")
      .insert(newGroupData)
      .then((data) => {
        res.status(201).json(newGroupData);
        console.log(`created note`);
        // console.log(data);
      })
      .catch((error) => {
        res.status(406).send(`Failed to create group: ${error}`);
      });
  }
});

// Update keyword of group
router.patch("/:groupID", (req, res) => {
  const selectedGroupID = req.params.groupID;
  const toUpdateGroupkeyword = req.body;

  // FIXME: Validation for checking for correct update fields method 2
  // we are only using a specific key, so even if there were other ones
  // they would not get consumed...
  // const toUpdateGroupKeyword = req.body.keyword; // no work not ob

  const { keyword, ...others } = toUpdateGroupkeyword;

  const otherattributearray = Object.keys(others);

  if (!keyword || otherattributearray.length != 0) {
    res.status(406).send("Incorrect inputs");
  } else {
    knex
      .from("group")
      .where("id", selectedGroupID)
      .update(toUpdateGroupkeyword)
      .then(() => {
        // this returns the object that was successfuly modified
        knex
          .select("*")
          .from("group")
          .where("id", selectedGroupID)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      })
      .catch((error) => {
        res.status(406).send(`Update changed aborted: ${error}`);
      });
  }
});

module.exports = router;
