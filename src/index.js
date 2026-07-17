const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Routes
const searchRoute = require("./routes/search");
const playRoute = require("./routes/play");
const lyricsRoute = require("./routes/lyrics");
const playlistRoute = require("./routes/playlist");
const homeRoute = require("./routes/home");
const trendingRoute = require("./routes/trending");

// App Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// API Routes
app.use("/search", searchRoute);
app.use("/play", playRoute);
app.use("/lyrics", lyricsRoute);
app.use("/playlist", playlistRoute);
app.use("/home", homeRoute);
app.use("/trending", trendingRoute);

// Root Endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Anizo API",
    version: "2.1.0",
    status: "Online",
    endpoints: {
      search: "/search?q=",
      play: "/play?id=",
      lyrics: "/lyrics",
      playlist: "/playlist",
      home: "/home",
      trending: "/trending"
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("====================================");
  console.log("🎵 Anizo Backend V2 Started");
  console.log(`🚀 Port : ${PORT}`);
  console.log(`🌍 Local: http://localhost:${PORT}`);
  console.log("====================================");
});
