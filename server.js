const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const knex = require("knex")(require("./knexfile"));
const bodyParser = require("body-parser");

const grouproute = require("./routes/group/GroupRoute");
const highlightsRoute = require("./routes/Highlight/HighlightsRoute");
const notesRoute = require("./routes/Note/NotesRoute");

const PORT = process.env.PORT || 3000;
let isodate = new Date().toISOString();
console.log(isodate);

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Routes
app.use("/api/groups", grouproute);
app.use("/api/highlights", highlightsRoute);
app.use("/api/notes", notesRoute);

//Test Route
app.get("/test1", (req, res) => {
  res.send("CONNECTED TO REFRYIT BACKEND");
});

app.get("/test2", (req, res) => {
  knex
    .select("*")
    .from("highlight")
    .then((data) => {
      res.status(200).json(data);
    });
});

app.post("/posttest1", (req, res) => {
  console.log(
    "/////////////////////////////////////////////////////////////////"
  );
  const { name, last } = req.body;
  console.log(name + last);
  res.send("created!");
});

app.listen(PORT, () => {
  console.log(`Server us running on ${PORT}`);
});
