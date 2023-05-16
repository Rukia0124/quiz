import React, { useState } from "react";
import { createQuiz } from "../../lib/common";

const CreateQcm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleQuizCreation = async (e) => {
    e.preventDefault();
    const newQuiz = {
      question,
      options,
      correctAnswer,
    };

    try {
      await createQuiz(newQuiz, localStorage.getItem("token"));
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
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
        {options.map((option, index) => (
          <label key={index}>
            Option {index + 1}:
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </label>
        ))}
        <br />
        <label>
          Réponse correcte:
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            <option value="">Sélectionnez une réponse</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Créer la question</button>
      </form>
    </div>
  );
};

export default CreateQcm;
