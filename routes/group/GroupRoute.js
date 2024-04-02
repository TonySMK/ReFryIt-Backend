const express = require("express");
const router = express.Router();

const groupController = require("../../controllers/group_controllers");

/*
in this this route, we are literally putting a function 
within a callback function... so there is the callback
function which is in this file or block/endpoint level
"(req, res) =>{<something>}" 

but then within that "<something>" we are (implementing) 
importing another function that uses the arguments from 
the wrapping callback function...

so b/c we are calling the imported function within the
callback function, our imported function in this case does 
not have access to the block or endpoint "req, and res" arguments, 
due to encapsulation, so we have to "inject"/"add" 
the req and res the imported function when we call it...
...basically "prop drill those arguments"


vs.

replacing the entire callback function with imported function
-this done in the highlightRoute.js

...and that is why our routes don't work when we just call the
imported function without parentheses + arguments, like those in 
james' repo or online repos, i did not recognize that...
*/

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
