const express = require("express");
const router = express.Router();
const ctrls = require("../controllers")

router.get("/", ctrls.videos.index)

module.exports = router;