const quizService = require("../services/quiz.service");

exports.createQcm = async (req, res) => {
  const { question, options, correctAnswer } = req.body;
  const userId = req.auth.userId;
  try {
    const createdQuiz = await quizService.createQcm(
      userId,
      question,
      options,
      correctAnswer
    );
    res.status(201).json(createdQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createOpen = async (req, res) => {
  const { question, correctAnswer } = req.body;
  const userId = req.auth.userId;
  try {
    const createdQuiz = await quizService.createOpen(
      userId,
      question,
      correctAnswer
    );
    res.status(201).json(createdQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createOrderedImages = async (req, res, next) => {
  const questionData = req.body;
  const userId = req.auth.userId;
  const imagesArray = [];
  for (let i = 0; i < req.files.length; i++) {
    imagesArray.push(req.files[i].path);
  }
  questionData.images = imagesArray;
  try {
    const createdQuiz = await quizService.createOrderedImages(
      userId,
      questionData
    );
    res.status(201).json(createdQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.createOrdered = async (req, res) => {
  const { question, images } = req.body;
  const userId = req.auth.userId;
  try {
    const createdQuiz = await quizService.createOrdered(
      userId,
      question,
      images
    );
    res.status(201).json(createdQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  const updatedData = req.body;

  try {
    const updatedQuiz = await quizService.updateQuiz(quizId, updatedData);
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    await quizService.deleteQuiz(quizId);
    res.status(200).json({ message: "Quiz supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listQuestions = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const questions = await quizService.listQuestionsByUserId(userId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.listQuestionsById = async (req, res) => {
  const questionId = req.params.id;

  try {
    const questions = await quizService.listQuestionsById(questionId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
