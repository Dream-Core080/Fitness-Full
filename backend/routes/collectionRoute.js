const express = require("express");
const router = express.Router();
const {requiresAuth} = require('../middleware/firebaseAuthMiddleware.js');

const {
  getCollections,
  addCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
  getCollection
} = require("../controllers/collectionController");


router.get("/", getCollections);
router.get("/all", requiresAuth, getAllCollections); 
router.get("/:id", requiresAuth, getCollection);
router.post("/", requiresAuth, addCollection);
router.put("/", requiresAuth, updateCollection);
router.delete("/:id", requiresAuth, deleteCollection);

module.exports = router;
