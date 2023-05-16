import React, { useState } from "react";
import { createOpen } from "../../lib/common";

const CreateOpenQuestion = () => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleQuizCreation = async (e) => {
    e.preventDefault();
    const newOpenQuestion = {
      question,
      correctAnswer,
    };

    try {
      await createOpen(newOpenQuestion, localStorage.getItem("token"));
      setQuestion("");
      setCorrectAnswer("");
      console.log("here");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleQuizCreation}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <br />
        <label>
          Réponse correcte:
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Créer la question</button>
      </form>
    </div>
  );
};

export default CreateOpenQuestion;
