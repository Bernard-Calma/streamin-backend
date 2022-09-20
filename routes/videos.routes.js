const express = require("express");
const router = express.Router();
const ctrls = require("../controllers")

router.get("/", ctrls.videos.index)
router.post("/", ctrls.videos.create)
router.get("/:id",ctrls.videos.show)
module.exports = router;