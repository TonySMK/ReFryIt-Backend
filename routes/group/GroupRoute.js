const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

router.get("/", (req, res) => {
  knex
    .from("group")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
});

module.exports = router;
