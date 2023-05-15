import React, { useState, useEffect } from "react";
import { getQuestions } from "../lib/common";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const data = await getQuestions();
      if (data) {
        setQuestions(data);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions
          ? questions.map((question) => (
              <li key={question.id}>{question.question}</li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default Questions;
