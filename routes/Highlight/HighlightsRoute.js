const express = require("express");
const router = express.Router();

/* 
in this route we implementing the controllers in the intended way,
where we are replacing the callback function (section) with 
the imported function from the contoller file

...instead of placing the imported function inside of the endpoint's
callback function and then have to "prop drill" the arguments


*/

const highlightContoller = require("../../controllers/highlight_controllers");

// Gets all hightlights
router.get("/", highlightContoller.highlightGetAll);

// Gets specific hightlight
router.get("/specific/:highlightID", highlightContoller.highlightGetOne);

// Get highlights by recents
router.get("/filter/recent", highlightContoller.highlightGetRecent);

// Get highlights by favorite
router.get("/filter/favorite", highlightContoller.hightlightGetFavorite);

// Get highlights by group_id V2
router.get("/filter/group/:group", highlightContoller.highlightGetByGroup);

// Create a new highlight
router.post("/", highlightContoller.highlightCreateNew);

// delete a specific highlight
router.delete("/:highlightID", highlightContoller.highlightDeleteOne);

// updates a specific highlight attributes v1
router.patch("/:highlightID", highlightContoller.highlightUpdate);

module.exports = router;
