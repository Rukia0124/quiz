import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import { getFromCookie } from "../lib/common";

const NewQuiz = ({ questions, setSelected }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [showLink, setShowLink] = useState(false);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const updatedList = [...questions];
    const droppedItem = updatedList[draggedItem];

    updatedList.splice(draggedItem, 1);
    updatedList.splice(index, 0, droppedItem);

    setSelected(updatedList);
    setDraggedItem(null);
  };

  const handleClick = () => {
    const token = getFromCookie("token");
    const socket = io(process.env.REACT_APP_API_URL);
    socket.emit("createRoom", token);

    socket.on("roomCreated", (roomId) => {
      setRoomId(roomId);
      setShowLink(true);
      document.cookie = "socketId=" + socket.id + ";path=/";
      console.log(roomId);
    });
  };

  return (
    <div id="questions">
      <h3>Nouveau Quiz</h3>
      <div className="questions">
        <ul>
          {questions.map((question, index) => (
            <li
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              {question.question}
            </li>
          ))}
        </ul>
      </div>
      {showLink ? (
        <NavLink to={`/rooms/${roomId}`}>Voir la room</NavLink>
      ) : (
        <button onClick={handleClick}>Créer la room</button>
      )}
    </div>
  );
};

export default NewQuiz;
