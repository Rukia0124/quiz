const Quiz = require("../models/Quiz");

class QuizService {
  async createQuiz(userId, question, options, correctAnswer) {
    try {
      const quiz = new Quiz({
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

  async getQuestionsByUserId(userId) {
    try {
      return await Quiz.find({ userId });
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = new QuizService();
