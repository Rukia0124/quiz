const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const imgCompression = require("../middlewares/imgCompression");

router.get("/", auth, quizController.listQuestions);
router.get("/list", auth, quizController.listQuestionsById);

router.post("/qcm", auth, quizController.createQcm);
router.post("/open", auth, quizController.createOpen);
router.post("/orderedImages", auth, multer, quizController.createOrderedImages);
router.post("/ordered", auth, quizController.createOrdered);
module.exports = router;
