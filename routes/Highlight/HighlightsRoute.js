const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

// Gets all hightlights
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("highlight")
    .then((data) => {
      res.status(200).json(data);
    });
});

// Gets most recent highlights, specific number of highlights
router.get("/filter/recent/:amount", (req, res) => {
  let fitleramount = Number(req.params.amount);
  // res.send(fitleramount);
  knex
    .select("*")
    .from("highlight")
    .orderBy("updated_at", "desc")
    .limit(fitleramount)
    .then((data) => {
      res.status(200).json(data);
    });
});

// Insert highlight data into highlight table
router.post("/", (req, res) => {
  const { title, highlight_passage, domain, domain_path, favicon_url, group } =
    req.body;
  const postData = req.body;
  // adding validationV1
  if (!title || !highlight_passage || !domain || !domain_path || !group) {
    console.log("missing input");
    res.status(406).send("missing input fields");
  } else {
    knex
      .from("highlight")
      .insert(postData)
      .then((data) => {
        res.status(201).json(postData);
        console.log(`created ${title}`);
      });
  }
});

module.exports = router;
