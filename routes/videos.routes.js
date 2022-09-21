const express = require("express");
const router = express.Router();
const ctrls = require("../controllers")

router.get("/", ctrls.videos.index)
router.post("/", ctrls.videos.create)
router.put("/:id", ctrls.videos.edit)
router.get("/:id", ctrls.videos.show)
router.delete("/:id", ctrls.videos.destroy)
module.exports = router;