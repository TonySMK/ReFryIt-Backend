const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

// Get all notes
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("note")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(404).send(`No notes found`);
    });
});

// Get all notes for a specific highlight
router.get("/:id", (req, res) => {
  const selectedHighlightID = req.params.id;
  knex
    .select("*")
    .from("note")
    .where("highlight_id", selectedHighlightID)
    .then((data) => {
      if (data.length === 0) {
        throw error;
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(404).json(`No notes found!`);
    });
});

module.exports = router;
