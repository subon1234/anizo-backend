const express = require("express");
const router = express.Router();

const { play } = require("../controllers/playController");

router.get("/", play);

module.exports = router;