const quizService = require("../services/createQuiz.service");

exports.createQuiz = async (req, res) => {
  const { question, options, correctAnswer } = req.body;
  const userId = req.auth.userId;
  try {
    const createdQuiz = await quizService.createQuiz(
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

exports.getQuestions = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const questions = await quizService.getQuestionsByUserId(userId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
