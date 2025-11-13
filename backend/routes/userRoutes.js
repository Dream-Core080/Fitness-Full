const express = require("express");
const router = express.Router();

const { requiresAuth } = require('../middleware/firebaseAuthMiddleware.js');

const {
  registerUser, getUserProfile, updateUserProfile, updateUserExperience, getUsers, deleteUser, updateUserAvatarUrl, signInAdmin, getUser

} = require("../controllers/userController");

router.post("/register_user", registerUser);
router.post("/signin_admin", signInAdmin);
router.get("/get_user_profile", requiresAuth, getUserProfile);
router.post("/update_user_profile", requiresAuth, updateUserProfile);
router.post("/update_user_experience", requiresAuth, updateUserExperience);
router.post("/update_user_avatar", requiresAuth, updateUserAvatarUrl);

router.get("/admin", requiresAuth, getUsers);
router.get("/admin/:id", requiresAuth, getUser);
router.delete("/admin/:id", requiresAuth, deleteUser);

module.exports = router;