const express = require("express");
const router = express.Router();

const { lyrics } = require("../controllers/lyricsController");

router.get("/", lyrics);

module.exports = router;