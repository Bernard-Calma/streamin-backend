const express = require("express");
const router = express.Router();
const ctrls = require("../controllers")

router.get("/", ctrls.users.index)
router.post("/", ctrls.users.create)
router.get("/:id", ctrls.users.show)
router.put("/:id",ctrls.users.edit)
router.post("/login",ctrls.users.login)

module.exports = router;