const express = require("express");
const router = express.Router();
const {requiresAuth} = require('../middleware/firebaseAuthMiddleware.js');

const {
  getEquipments,
  addEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipment,
} = require("../controllers/equipmentController");

router.get("/", getEquipments);
router.get("/:id", requiresAuth, getEquipment);
router.post("/", requiresAuth, addEquipment);
router.put("/", requiresAuth, updateEquipment);
router.delete("/:id", requiresAuth, deleteEquipment);

module.exports = router;
