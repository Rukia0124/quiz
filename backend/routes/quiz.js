const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz");
const auth = require("../middlewares/auth");

router.post("/", auth, quizController.createQuiz);
router.get("/", auth, quizController.listQuestions);
module.exports = router;
