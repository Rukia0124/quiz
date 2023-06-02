import React, { useState } from "react";
import { createOpen, getFromCookie } from "../../lib/common";

const CreateOpenQuestion = () => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setcorrectAnswer] = useState("");

  const handleQuizCreation = async (e) => {
    e.preventDefault();
    const newOpenQuestion = {
      question,
      correctAnswer,
    };

    try {
      await createOpen(newOpenQuestion, getFromCookie("token"));
      setQuestion("");
      setcorrectAnswer("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="open">
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
            onChange={(e) => setcorrectAnswer(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Créer la question</button>
      </form>
    </div>
  );
};

export default CreateOpenQuestion;
