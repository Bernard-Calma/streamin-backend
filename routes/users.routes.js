const express = require("express");
const router = express.Router();
const ctrls = require("../controllers")

router.post("/", ctrls.users.create)
router.get("/:id", ctrls.users.show)
router.put("/:id",ctrls.videos.create)

module.exports = router;