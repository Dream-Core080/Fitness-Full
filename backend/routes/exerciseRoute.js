const express = require("express");
const router = express.Router();
const {requiresAuth} = require('../middleware/firebaseAuthMiddleware.js');

const {
  getExerciseHistory,
  getExerciseLibrary,
  getExerciseFavorite,
  getExerciseRecommended,
  getExercise,
  updateFavorite,
  updateNote,

  addExerciseAdmin,
  updateExerciseAdmin,
  deleteExerciseAdmin,
  getExercisesAdmin,
  getExerciseAdmin,
  
  addExercises,
  updateExercises,
} = require("../controllers/exerciseController");

router.get("/get_exercise_history", requiresAuth, getExerciseHistory);
router.get("/get_exercise_library", requiresAuth, getExerciseLibrary);
router.get("/get_exercise_favorite", requiresAuth, getExerciseFavorite);
router.get("/get_exercise_recommended", requiresAuth, getExerciseRecommended);
router.get("/get_exercise", requiresAuth, getExercise);
router.post("/update_favorite", requiresAuth, updateFavorite);
router.post("/update_note", requiresAuth, updateNote);

router.get("/admin", requiresAuth, getExercisesAdmin);
router.get("/admin/:id", requiresAuth, getExerciseAdmin);
router.post("/admin", requiresAuth, addExerciseAdmin);
router.put("/admin", requiresAuth, updateExerciseAdmin);
router.delete("/admin/:id", requiresAuth, deleteExerciseAdmin);

//router.post("/admin/add_exercises", addExercises);
//router.post("/admin/update_exercises", updateExercises);

module.exports = router;
