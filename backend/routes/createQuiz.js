const express = require("express");
const router = express.Router();
const quizController = require("../controllers/createQuiz");
const auth = require("../middlewares/auth");

router.post("/", auth, quizController.createQuiz);
router.get("/questions", auth, quizController.getQuestions);
module.exports = router;
