const express = require("express");
const router = express.Router();
const ctrls = require("../controllers")

router.get("/", ctrls.comments.index)

module.exports = router;