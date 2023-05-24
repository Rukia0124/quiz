const Qcm = require("../models/qcm");
const Open = require("../models/open");
const OrderedImages = require("../models/order");
const Ordered = require("../models/ordered");

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
      throw new Error(error);
    }
  }

  async createOrderedImages(userId, questionData) {
    try {
      const quiz = new OrderedImages({
        userId,
        question: questionData.question,
        images: questionData.images,
        correctAnswer: questionData.correctAnswer,
      });

      return await quiz.save();
    } catch (error) {
      throw new Error(error);
    }
  }
  async createOrdered(userId, question, images) {
    try {
      const quiz = new Ordered({
        userId,
        question,
        images,
      });

      return await quiz.save();
    } catch (error) {
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

  async listQcmByUserId(userId) {
    try {
      return await Qcm.find({ userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  async listOpenByUserId(userId) {
    try {
      return await Open.find({ userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  async listOrderedByUserId(userId) {
    try {
      return await OrderedImages.find({ userId });
    } catch (error) {
      throw new Error(error);
    }
  }
  async listOrderedV2ByUserId(userId) {
    try {
      return await Ordered.find({ userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  async listQuestionsByUserId(userId) {
    try {
      const qcmList = await this.listQcmByUserId(userId);
      const openList = await this.listOpenByUserId(userId);
      const orderedList = await this.listOrderedByUserId(userId);
      const orderedV2List = await this.listOrderedV2ByUserId(userId);

      return { qcmList, openList, orderedList, orderedV2List };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new QuizService();
