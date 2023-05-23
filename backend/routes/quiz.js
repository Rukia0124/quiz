const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const imgCompression = require("../middlewares/imgCompression");

router.get("/", auth, quizController.listQuestions);

router.post("/qcm", auth, quizController.createQcm);
router.post("/open", auth, quizController.createOpen);
router.post("/orderedImages", auth, multer, quizController.createOrderedImages);
module.exports = router;
