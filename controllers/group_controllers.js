const knex = require("knex")(require("../knexfile"));

const groupsGetAll = (req, res) => {
  knex
    .from("group")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
};

const groupNewGroup = (req, res) => {
  const newGroupData = req.body;

  const { keyword, ...others } = newGroupData;
  const otherattributearray = Object.keys(others);
  console.log(keyword);

  if ((!keyword, otherattributearray != 0)) {
    // FIXME: do we need to do somesort of validation when an object is passed but no key is provided?
    res.status(406).send("Incorrect inputs");
  } else {
    knex
      .from("group")
      .insert(newGroupData)
      .then((data) => {
        res.status(201).json(newGroupData);
        console.log(`created note`);
      })
      .catch((error) => {
        res.status(406).send(`Failed to create group: ${error}`);
      });
  }
};

const groupUpdate = (req, res) => {
  const selectedGroupID = req.params.groupID;
  const toUpdateGroupkeyword = req.body;

  const { keyword, ...others } = toUpdateGroupkeyword;

  const otherattributearray = Object.keys(others);

  if (!keyword || otherattributearray.length != 0) {
    res.status(406).send("Incorrect inputs");
  } else {
    knex
      .from("group")
      .where("id", selectedGroupID)
      .update(toUpdateGroupkeyword)
      .then(() => {
        knex
          .select("*")
          .from("group")
          .where("id", selectedGroupID)
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
};

const groupDelete = (req, res) => {
  const selectedGroupID = req.params.groupID;

  knex
    .select("*")
    .from("group")
    .where("id", selectedGroupID)
    .then((data) => {
      if (data.length === 0 || data.length > 1) {
        res.status(404).send(`Group not found`);
      } else {
        knex
          .from("group")
          .where("id", selectedGroupID)
          .del()
          .then(() => {
            res.status(200).send(`Deleted Group!`);
          })
          .catch((error) => {
            res.status(500).send(`delete unsuccessful ${error}`);
          });
      }
    })
    .catch((error) => {
      res.status(404).json(`Delete Aborted: ${error}`);
    });
};

module.exports = {
  groupsGetAll,
  groupNewGroup,
  groupUpdate,
  groupDelete,
};
