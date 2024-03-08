const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("your have reached the Highlights router");
});

module.exports = router;
