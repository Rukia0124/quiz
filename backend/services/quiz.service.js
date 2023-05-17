const Qcm = require("../models/qcm");
const Open = require("../models/open");

class QuizService {
  async createQcm(userId, question, options, correctAnswer) {
    try {
      const quiz = new Qcm({
        userId,
        question,
        options,
        correctAnswer,
      });

      return await quiz.save();
    } catch (error) {
      console.log(userId);
      throw new Error(error);
    }
  }
  async createOpen(userId, question, correctAnswer) {
    try {
      const quiz = new Open({
        userId,
        question,
        correctAnswer,
      });

      return await quiz.save();
    } catch (error) {
      console.log(userId);
      throw new Error(error);
    }
  }

  async createOrderedImages(userId, question, images, correctAnswer) {
    try {
      const quiz = new OrderedImages({
        userId,
        question,
        images,
        correctAnswer,
      });

      return await quiz.save();
    } catch (error) {
      console.log(userId);
      throw new Error(error);
    }
  }

  async updateQuiz(quizId, updatedData) {
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        throw new Error("Quiz introuvable");
      }

      quiz.question = updatedData.question || quiz.question;
      quiz.options = updatedData.options || quiz.options;
      quiz.correctAnswer = updatedData.correctAnswer || quiz.correctAnswer;

      return await quiz.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteQuiz(quizId) {
    try {
      return await Quiz.findByIdAndDelete(quizId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async listQuestionsByUserId(userId) {
    try {
      return await Qcm.find({ userId });
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = new QuizService();
