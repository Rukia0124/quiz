import React, { useState } from "react";
import { createOrdered, getFromCookie } from "../../lib/common";

const Ordered = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { number: 1, url: "", preview: "" },
    { number: 2, url: "", preview: "" },
    { number: 3, url: "", preview: "" },
    { number: 4, url: "", preview: "" },
  ]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerUrlChange = (e, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].url = e.target.value;
    updatedAnswers[index].preview = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleAnswerNumberChange = (e, index) => {
    const number = parseInt(e.target.value);
    if (number >= 1 && number <= 4) {
      const updatedAnswers = [...answers];
      updatedAnswers[index].number = number;
      setAnswers(updatedAnswers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderedImages = answers.map((answer) => ({
      number: answer.number,
      url: answer.url,
    }));

    const newOrdered = {
      question,
      images: orderedImages,
    };

    try {
      await createOrdered(newOrdered, getFromCookie("token"));
      setQuestion("");
      setAnswers([
        { number: 1, url: "", preview: "" },
        { number: 2, url: "", preview: "" },
        { number: 3, url: "", preview: "" },
        { number: 4, url: "", preview: "" },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="ordered-images">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question :</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            required
          />
        </div>
        {answers.map((answer, index) => (
          <div key={index}>
            <label htmlFor={`answer-url-${index}`}> Url de l'image :</label>
            <input
              type="text"
              id={`answer-url-${index}`}
              value={answer.url}
              onChange={(e) => handleAnswerUrlChange(e, index)}
              required
            />
            <label htmlFor={`answer-number-${index}`}>
              Position de l'image :
            </label>
            <input
              type="number"
              id={`answer-number-${index}`}
              value={answer.number}
              onChange={(e) => handleAnswerNumberChange(e, index)}
              min={1}
              max={4}
              required
            />
            {answer.preview && (
              <img
                src={answer.preview}
                alt={`Réponse ${answer.number}`}
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </div>
        ))}
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Ordered;
