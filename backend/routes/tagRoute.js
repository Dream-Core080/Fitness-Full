const express = require("express");
const router = express.Router();
const {requiresAuth} = require('../middleware/firebaseAuthMiddleware.js');

const {
  getTags, addTag, updateTag, deleteTag, getTag, getTagNames
 
} = require("../controllers/tagController");

router.get("/", getTags);
router.get("/:id", requiresAuth, getTag);

router.get("/get_names", requiresAuth, getTagNames);

router.post("/", requiresAuth, addTag);
router.put("/", requiresAuth, updateTag);
router.delete("/:id", requiresAuth, deleteTag);

module.exports = router;
