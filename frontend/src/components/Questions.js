import React, { useState, useEffect } from "react";
import { listQuestions } from "../lib/common";
import NewQuiz from "./NewQuiz";

const Questions = () => {
  const [questions, setQuestions] = useState({});
  const [selected, setSelected] = useState([]);

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
    const id = event.target.getAttribute("data-question-id");
    event.target.classList.toggle("selected");
    if (selected.includes(id)) {
      setSelected(selected.filter((questionId) => questionId !== id));
    } else {
      setSelected((selected) => [...selected, id]);
    }
  };

  return (
    <div id="questions">
      <h3>Mes questions</h3>
      <div className="questions">
        <ul>
          {questions.qcmList &&
            questions.qcmList.map((question) => (
              <li
                className="qcmlist"
                key={question._id}
                onClick={toggleSelection}
                data-question-id={question._id}
              >
                {question.question}
              </li>
            ))}
          {questions.openList &&
            questions.openList.map((question) => (
              <li
                className="plop"
                key={question._id}
                onClick={toggleSelection}
                data-question-id={question._id}
              >
                {question.question}
              </li>
            ))}
          {questions.orderedList &&
            questions.orderedList.map((question) => (
              <li
                className=""
                key={question._id}
                onClick={toggleSelection}
                data-question-id={question._id}
              >
                {question.question}
              </li>
            ))}
          {questions.orderedV2List &&
            questions.orderedV2List.map((question) => (
              <li
                className=""
                key={question._id}
                onClick={toggleSelection}
                data-question-id={question._id}
              >
                {question.question}
              </li>
            ))}
        </ul>
      </div>
      <NewQuiz questions={selected} />
    </div>
  );
};

export default Questions;
