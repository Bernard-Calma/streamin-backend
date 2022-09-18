const express = require("express");
const router = express.Router();
const ctrls = require("../controllers")

router.get("/", ctrls.videos.index)
router.post("/", ctrls.videos.create)

module.exports = router;