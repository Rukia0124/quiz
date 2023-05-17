const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const imgCompression = require("../middlewares/imgCompression");

router.get("/", auth, quizController.listQuestions);

router.post("/", auth, quizController.createQcm);
router.post("/", auth, quizController.createOpen);
router.post(
  "/",
  auth,
  multer,
  imgCompression,
  quizController.createOrderedImages
);
module.exports = router;
