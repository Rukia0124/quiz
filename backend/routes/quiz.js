const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz");
const auth = require("../middlewares/auth");

router.get("/", auth, quizController.listQuestions);

router.post("/", auth, quizController.createQcm);
router.post("/", auth, quizController.createOpen);
router.post("/", auth, quizController.createOrderedImages);
module.exports = router;
