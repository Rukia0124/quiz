import React, { useState, useEffect } from "react";
import { listQuestions } from "../lib/common";

const Questions = () => {
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      const data = await listQuestions();
      if (data) {
        setQuestions(data);
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
          {questions
            ? questions.qcmList.map((question) => (
                <li
                  className="selected"
                  key={question.id}
                  onClick={toggleSelection}
                >
                  {question.question}
                </li>
              ))
            : ""}
          {questions
            ? questions.openList.map((question) => (
                <li
                  className="selected"
                  key={question.id}
                  onClick={toggleSelection}
                >
                  {question.question}
                </li>
              ))
            : ""}
          {questions
            ? questions.orderedList.map((question) => (
                <li
                  className="selected"
                  key={question.id}
                  onClick={toggleSelection}
                >
                  {question.question}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default Questions;
