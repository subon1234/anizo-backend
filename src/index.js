const express = require("express");
const cors = require("cors");
const searchRoute = require("./routes/search");
require("dotenv").config();
const playRoute = require("./routes/play");
const app = express();
const lyricsRoute = require("./routes/lyrics");
const playlistRoute = require("./routes/playlist");
const homeRoute = require("./routes/home");

app.use(cors());
app.use(express.json());
app.use("/play", playRoute);
app.use("/lyrics", lyricsRoute);
app.use("/playlist", playlistRoute);
app.use("/home", homeRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Anizo API",
    version: "1.0.0",
    message: "Backend is running "
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Anizo API running on http://localhost:${PORT}`);
});
