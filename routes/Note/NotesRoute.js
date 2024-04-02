const express = require("express");
const router = express.Router();

const noteControllers = require("../../controllers/note_controllers");

// Get all notes
router.get("/", noteControllers.noteGetAll);

// Get all notes for a specific highlight
router.get("/:highlightID", noteControllers.noteGetAllForAHighlight);

// Create a note for specific highlight
router.post("/", noteControllers.noteGetOneForAHighlight);

//Update a note's note content
router.patch("/:noteID", noteControllers.noteUpdateContent);

//Delete a specific note
router.delete("/:noteID", noteControllers.noteDeteleOne);

module.exports = router;
