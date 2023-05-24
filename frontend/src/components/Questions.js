import React, { useState, useEffect } from "react";
import { listQuestions } from "../lib/common";

const Questions = () => {
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      const data = await listQuestions();
      if (data) {
        setQuestions(data);
        console.log(data);
      }
    }

    fetchQuestions();
  }, []);

  const toggleSelection = (event) => {
    event.target.classList.toggle("selected");
  };

  return (
    <div id="questions">
      <h3>Mes questions</h3>
      <div className="questions">
        <ul>
          {questions.qcmList &&
            questions.qcmList.map((question) => (
              <li
                className="selected"
                key={question.id}
                onClick={toggleSelection}
              >
                {question.question}
              </li>
            ))}
          {questions.openList &&
            questions.openList.map((question) => (
              <li
                className="selected"
                key={question.id}
                onClick={toggleSelection}
              >
                {question.question}
              </li>
            ))}
          {questions.orderedList &&
            questions.orderedList.map((question) => (
              <li
                className="selected"
                key={question.id}
                onClick={toggleSelection}
              >
                {question.question}
              </li>
            ))}
          {questions.orderedV2List &&
            questions.orderedV2List.map((question) => (
              <li
                className="selected"
                key={question.id}
                onClick={toggleSelection}
              >
                {question.question}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Questions;
