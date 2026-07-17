require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const searchRoute = require("./routes/search");
const playRoute = require("./routes/play");
const lyricsRoute = require("./routes/lyrics");
const playlistRoute = require("./routes/playlist");
const homeRoute = require("./routes/home");
const trendingRoute = require("./routes/trending");
const recommendationRoute = require("./routes/recommendation");
const artistRoute = require("./routes/artist");
const albumRoute = require("./routes/album");
const app = express();
const genreRoute = require("./routes/genre");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/artists", artistRoute);

app.use(logger);

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Anizo Music API",
    version: "2.0.0",
    status: "Running",
    endpoints: {
      home: "/home",
      search: "/search?q=",
      play: "/play?id=",
      lyrics: "/lyrics?id=",
      trending: "/trending",
      recommendations: "/recommendations",
      playlist: "/playlist"
    }
  });
});

app.use("/search", searchRoute);
app.use("/play", playRoute);
app.use("/lyrics", lyricsRoute);
app.use("/playlist", playlistRoute);
app.use("/home", homeRoute);
app.use("/trending", trendingRoute);
app.use("/recommendations", recommendationRoute);
app.use("/albums", albumRoute);
app.use("/genres", genreRoute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
=====================================
🎵 Anizo Backend v2 Started
=====================================
Server : http://localhost:${PORT}
Mode   : ${process.env.NODE_ENV || "development"}
=====================================
`);
});
