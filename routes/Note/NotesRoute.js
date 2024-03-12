const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

// Get all notes
router.get("/", (req, res) => {
  // FIXME: might need a validator when there are no notes...
  // atm, an empty array get returned

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
router.get("/:highlightID", (req, res) => {
  const selectedHighlightID = req.params.highlightID;
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

// Create a note for specific highlight
router.post("/", (req, res) => {
  const newNoteData = req.body;
  // console.log(newNoteData);
  const { highlight_id, note_passage, ...others } = newNoteData;
  // console.log(highlight_id, note_passage);
  const otherattributearray = Object.keys(others);
  // console.log(otherattributearray.length);

  if (!highlight_id || !note_passage || otherattributearray != 0) {
    // res.send("tripped");
    res.status(406).send("Incorrect inputs");
  } else {
    // res.send("not tripped");
    knex
      .from("note")
      .insert(newNoteData)
      .then((data) => {
        res.status(201).json(newNoteData);
        console.log(`created note`);
      })
      .catch((error) => {
        res.status(406).send(`Failed to create note: ${error}`);
      });
  }
});

//Update a note's note content
router.patch("/:noteID", (req, res) => {
  const noteID = req.params.noteID;
  const toUpdateNotePassage = req.body;

  const { note_passage, ...others } = toUpdateNotePassage;
  console.log(note_passage);

  const otherattributearray = Object.keys(others);

  if (!note_passage || otherattributearray.length > 0) {
    res.status(406).send("Incorrect inputs");
  } else {
    // res.send("passed");
    knex
      .from("note")
      .where("id", noteID)
      .update(toUpdateNotePassage)
      .then(() => {
        // this returns the object that was successfuly modified
        knex
          .select("*")
          .from("note")
          .where("id", noteID)
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

//Delete a specific note
router.delete("/:noteID", (req, res) => {
  const selectedNoteID = req.params.noteID;

  knex
    .select("*")
    .from("note")
    .where("id", selectedNoteID)
    .then((data) => {
      // res.json(data);
      // res.json(data.length);
      if (data.length === 0 || data.length > 1) {
        res.status(404).send(`Note not found`);
      } else {
        knex
          .from("note")
          .where("id", selectedNoteID)
          .del()
          .then((row) => {
            res.status(200).send("deleted!");
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    })
    .catch((error) => {
      // FIXME: this catch.status seems out of place...
      // in what situation would this get triggered?
      res.status(404).json(`Delete Aborted: ${error}`);
    });
});

module.exports = router;
