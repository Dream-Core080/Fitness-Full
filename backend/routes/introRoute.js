const express = require("express");
const router = express.Router();
const { requiresAuth } = require('../middleware/firebaseAuthMiddleware.js');

const {
  getIntro, updateIntro

} = require("../controllers/introController.js");

router.get("/", requiresAuth, getIntro);
router.put("/", requiresAuth, updateIntro);

module.exports = router;