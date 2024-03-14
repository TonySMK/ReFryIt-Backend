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
    })
    .catch((error) => {
      res.status(404).send(`No Highlights`);
    });
});

// Gets specific hightlight
router.get("/specific/:highlightID", (req, res) => {
  const selectID = req.params.highlightID;
  knex
    .select("*")
    .from("highlight")
    .where("id", selectID)
    .then((data) => {
      res.status(200).json(data);
      // FIXME: do we need to implement somesort of validation for
      // highlight id that do exist?
    })
    .catch((error) => {
      res.status(404).send(`ID not found`);
    });
});

// Get highlights by recents
router.get("/filter/recent/:amount", (req, res) => {
  let fitlerAmount = req.params.amount;
  // res.send(fitleramount);
  knex
    .select("*")
    .from("highlight")
    .orderBy("updated_at", "desc")
    .limit(fitlerAmount)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(404).send(`No Recent Highlights`);
    });
});

// Get highlights by group_id V1
// router.get("/filter/group/:group/:amount", (req, res) => {
//   const fitlerAmount = req.params.amount;
//   const selectedGroupID = req.params.group;

//   knex
//     .select("*")
//     .from("highlight")
//     .where("group_id", selectedGroupID)
//     .orderBy("updated_at", "desc")
//     .limit(fitlerAmount)
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((error) => {
//       res.status(404).send(`No Highlights in group`);
//     });
// });

// Get highlights by group_id V2
router.get("/filter/group/:group", (req, res) => {
  const selectedGroupID = req.params.group;

  knex
    .select("*")
    .from("highlight")
    .where("group_id", selectedGroupID)
    .orderBy("updated_at", "desc")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(404).send(`No Highlights in group`);
    });
});

// Create a new highlight
router.post("/", (req, res) => {
  const {
    title,
    highlight_passage,
    domain,
    domain_path,
    favicon_url,
    group_id,
    star_status,
    visit_count,
    ...others
  } = req.body;
  const newHighlightData = req.body;
  let otherattributearray = Object.keys(others);
  // adding validationV1
  // FIXME: do we need to validate for using group.ids that
  // dont exist?
  // ANSWER: the db will pickup on the fact that we are trying
  // use a goup.id foreign key that does not exist yet

  if (
    !title ||
    !highlight_passage ||
    !domain ||
    !domain_path ||
    !group_id ||
    otherattributearray != 0
  ) {
    res.status(406).send("Incorrect inputs");
  } else {
    knex
      .from("highlight")
      .insert(newHighlightData)
      .then((data) => {
        res.status(201).json(newHighlightData);
        console.log(`created ${title}`);
      })
      .catch((error) => {
        res.status(406).send(`Create highlight failed: ${error}`);
      });
  }
});

// delete a specific highlight
router.delete("/:highlightID", (req, res) => {
  const selectedHighlighID = req.params.highlightID;
  console.log(selectedHighlighID);

  knex
    .select("*")
    .from("highlight")
    .where("id", selectedHighlighID)
    .then((data) => {
      // res.json(data);
      // res.json(data.length);
      if (data.length === 0 || data.length > 1) {
        res.status(404).send(`Highlight not found`);
      } else {
        knex
          .from("highlight")
          .where("id", selectedHighlighID)
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
      res.status(404).json(`Delete Aborted: ${error}`);
    });
});

// updates a specific highlight attributes v1
router.patch("/:highlightID", (req, res) => {
  const highlightID = req.params.highlightID;
  const toUpdateHighlightData = req.body;

  console.log(toUpdateData);

  // FIXME: do we need to implement somesort of validation for
  // highlight id that do exist?

  knex
    .from("highlight")
    .where("id", highlightID)
    .then((data) => {
      const selectedTableObjectKeys = Object.keys(data[0]);
      const bodyObjectKeys = Object.keys(toUpdateHighlightData);

      // we are checking if the submitted update keys match with
      // existing keys in row that wants to get changed
      // this method maintains itself, as we dont need to hardcode anything
      // for it do a check for..

      const promisecallbackstatus = true;
      // FIXME: Validation for checking for correct update fields method 0
      try {
        bodyObjectKeys.forEach((key) => {
          if (!selectedTableObjectKeys.includes(key)) {
            throw error;
          }
          // console.log("y");
        });
      } catch (error) {
        // console.log("n");
        promisecallbackstatus = false;
      }

      if (!promisecallbackstatus) {
        throw error;
      }
    })
    .then(() => {
      // res.send("great!!!");
      // this actually update the changed fields
      knex
        .from("highlight")
        .where("id", highlightID)
        .update(toUpdateHighlightData)
        .then(() => {
          // this returns the object that was successfuly modified
          knex
            .select("*")
            .from("highlight")
            .where("id", highlightID)
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
    })
    .catch((error) => {
      res.status(406).send("Incorrect inputs");
    });
});

// updates a specific highlight attributes v2 incomplete
router.patch("/test/:highlightID", (req, res) => {
  const highlightID = req.params.highlightID;
  const toUpdateData = req.body;

  const {
    title,
    highlight_passage,
    group_id,
    domain,
    domain_path,
    favicon_url,
    star_status,
    visit_count,
    ...rest
  } = toUpdateData;

  const otherattributearray = Object.keys(rest);

  if (otherattributearray.length > 0) {
    res.send("tripped");
  }

  console.log(toUpdateData);

  knex
    //  this is the actual updating sections
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
          // FIXME: do we need to implement somesort of validation for
          // highlight id that do exist?
        })
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => {
      res.status(406).send("Update changed failed");
    });
});

module.exports = router;
