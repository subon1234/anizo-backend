const express = require("express");
const router = express.Router();

const { playlist } = require("../controllers/playlistController");

router.get("/", playlist);

module.exports = router;