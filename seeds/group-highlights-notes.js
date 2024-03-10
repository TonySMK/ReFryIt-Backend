const groupseed = require("../seed-data/group_seed_data");
const hightlightseed = require("../seed-data/highlight_seed_data");
const noteseed = require("../seed-data/note_seed_data");

exports.seed = async function (knex) {
  return knex("group")
    .del()
    .then(function () {
      return knex("highlight").del();
    })
    .then(function () {
      return knex("note").del();
    })
    .then(function () {
      return knex("group").insert(groupseed);
    })
    .then(function () {
      return knex("highlight").insert(hightlightseed);
    })
    .then(() => {
      return knex("note").insert(noteseed);
    });
};
