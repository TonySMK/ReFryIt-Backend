const hightlightseed = require("../seed-data/highlight_seed_data");
const noteseed = require("../seed-data/note_seed_data");

exports.seed = async function (knex) {
  return knex("highlight")
    .del()
    .then(function () {
      return knex("note").del();
    })
    .then(function () {
      return knex("highlight").insert(hightlightseed);
    })
    .then(() => {
      return knex("note").insert(noteseed);
    });
};
