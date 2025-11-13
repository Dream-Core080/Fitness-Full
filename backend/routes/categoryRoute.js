const express = require("express");
const router = express.Router();
const {requiresAuth} = require('../middleware/firebaseAuthMiddleware.js');

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:id", requiresAuth, getCategory);
router.post("/", requiresAuth, addCategory);
router.put("/", requiresAuth, updateCategory);
router.delete("/:categoryId", requiresAuth, deleteCategory);

module.exports = router;
