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
    const question = event.target.getAttribute("data-question-question");
    const type = event.target.getAttribute("data-question-type");
    if (event.target.classList.contains("selected")) {
      setSelected(selected.filter((question) => question.id !== id));
    } else {
      setSelected((selected) => [
        ...selected,
        {
          question,
          id,
          type,
        },
      ]);
    }
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
                className="qcmlist"
                key={question._id}
                onClick={toggleSelection}
                data-question-id={question._id}
                data-question-type="qcm"
                data-question-question={question.question}
              >
                {question.question}
              </li>
            ))}
          {questions.openList &&
            questions.openList.map((question) => (
              <li
                key={question._id}
                onClick={toggleSelection}
                data-question-id={question._id}
                data-question-type="open"
                data-question-question={question.question}
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
                data-question-type="ordered"
                data-question-question={question.question}
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
                data-question-type="ordered"
                data-question-question={question.question}
              >
                {question.question}
              </li>
            ))}
        </ul>
      </div>
      <NewQuiz questions={selected} setSelected={setSelected} />
    </div>
  );
};

export default Questions;
