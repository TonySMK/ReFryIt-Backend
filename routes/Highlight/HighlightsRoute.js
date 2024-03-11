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

// Gets specific hightlight
router.get("/specific/:id", (req, res) => {
  const selectID = req.params.id;
  knex
    .select("*")
    .from("highlight")
    .where("id", selectID)
    .then((data) => {
      res.status(200).json(data);
    });
});

// Get highlights by recents
router.get("/filter/recent/:amount", (req, res) => {
  let fitlerAmount = Number(req.params.amount);
  // res.send(fitleramount);
  knex
    .select("*")
    .from("highlight")
    .orderBy("updated_at", "desc")
    .limit(fitlerAmount)
    .then((data) => {
      res.status(200).json(data);
    });
});

// Get highlights by group_id
router.get("/filter/group/:group/:amount", (req, res) => {
  const fitlerAmount = Number(req.params.amount);
  const selectedGroupID = Number(req.params.group);

  knex
    .select("*")
    .from("highlight")
    .where("group_id", selectedGroupID)
    .orderBy("updated_at", "desc")
    .limit(fitlerAmount)
    .then((data) => {
      res.status(200).json(data);
    });
});

// Create: Insert highlight data into highlight table
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

// deletes a specific highlight
router.delete("/:highlightID", (req, res) => {
  const selectedHighlighID = Number(req.params.highlightID);
  console.log(selectedHighlighID);
  knex
    .select("*")
    .from("highlight")
    .where("id", selectedHighlighID)
    .then((data) => {
      // res.json(data);
      // res.json(data.length);
      if (data.length === 0 || data.length > 1) {
        res.status(404).send(`Highlight ${deleteID} not found`);
      } else {
        knex
          .from("highlight")
          .where("id", selectedHighlighID)
          .del()
          .then((row) => {
            res.send("deleted!");
          });
      }
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

// updates a specific highlight attribute
router.patch("/:id", (req, res) => {
  const highlightID = req.params.id;
  const toUpdateData = req.body;
  let theobject = { name: "sam", last: "jam" };

  knex
    .from("highlight")
    .where("id", highlightID)
    .then((data) => {
      // console.log(data[0]);
      // console.log(Object.keys(data[0]));
      const selectedTableObjectKeys = Object.keys(data[0]);
      const bodyObjectKeys = Object.keys(toUpdateData);
      console.log(selectedTableObjectKeys);
      console.log(bodyObjectKeys);

      // we are checking if the submitted update keys match with
      // existing keys in row that wants is going to get changed

      try {
        bodyObjectKeys.forEach((key) => {
          if (!selectedTableObjectKeys.includes(key)) {
            throw error;
          }
          // console.log("y");
        });
      } catch (error) {
        // console.log("n");
        res.status(406).send("Incorrent object1");
      }

      //---------------------------------
      // first attmept
      // let matchStatusArray = [];
      // let dobreak = true;
      // while (dobreak) {
      //   bodyObjectKeys.forEach((key) => {
      //     for (let i = 0; i < selectedTableObjectKeys.length; i++) {
      //       if (!selectedTableObjectKeys.includes(key)) {
      //         // matchStatusArray.push(false);
      //         console.log("a");
      //         dobreak = false
      //         // return res.status(406).send("Incorrent object1");
      //       } else {
      //         // matchStatusArray.push(true);
      //         console.log("b");
      //       }
      //     }
      //   });
      // }
    })
    .then(() => {
      // res.send("great!!!");
      // this actually update the changed fields
      knex
        .from("highlight")
        .where("id", highlightID)
        .update(toUpdateData)
        .then(() => {
          // this returns the object that was successfuly modified
          knex
            .select("*")
            .from("highlight")
            .where("id", highlightID)
            .then((data) => {
              res.status(200).json(data);
            });
        })
        .catch((error) => {
          res.status(406).send("Incorrent object2");
        });
    });
});

module.exports = router;
