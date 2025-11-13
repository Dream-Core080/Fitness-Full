const express = require("express");
const router = express.Router();
const {requiresAuth} = require('../middleware/firebaseAuthMiddleware.js');

const {
  getQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getQuiz
} = require("../controllers/quizController");

router.get("/", getQuizzes);
router.get("/:id", requiresAuth, getQuiz);

router.post("/", requiresAuth, addQuiz);
router.put("/", requiresAuth, updateQuiz);
router.delete("/:id", requiresAuth, deleteQuiz);

module.exports = router;
