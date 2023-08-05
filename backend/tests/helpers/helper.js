const Quiz = require("./path/to/quiz/model");

async function createQcm(JWT_TOKEN) {
  const qcmData = {
    question: "qcm",
    options: ["opt1", "opt2", "opt3", "opt4"],
    correctAnswer: ["opt2"],
  };
  const qcm = new Quiz(qcmData);
  try {
    const savedQcm = await qcm.save();
    return savedQcm;
  } catch (error) {
    console.error("Erreur lors de la création du QCM:", error);
    throw error;
  }
}

module.exports = createQcm;
