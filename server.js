const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const highlightsRoute = require("./routes/Highlights/HighlightsRoute");
const notesRoute = require("./routes/Notes/NotesRoute");

const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/some/hightlights", highlightsRoute);
app.use("/some/notes", notesRoute);

//Test Route

app.get("/connecttest", (req, res) => {
  res.send("CONNECTED TO REFRYIT BACKEND");
});

app.listen(PORT, () => {
  console.log(`Server us running on ${PORT}`);
});
