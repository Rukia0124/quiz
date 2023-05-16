import React, { useState } from "react";
import { Button } from "antd";
import Questions from "../components/Questions";
import CreationModal from "../components/Modal";

const Create = () => {
  const [selectedModal, setSelectedModal] = useState(null);
  const [questionsKey, setQuestionsKey] = useState(0);

  const openModal = (modalName) => {
    setSelectedModal(modalName);
  };

  const closeModal = () => {
    setSelectedModal(null);
    setQuestionsKey((prevKey) => prevKey + 1);
  };

  return (
    <div id="creationModal">
      <h2>Créer un quiz</h2>
      <div className="btn-container">
        <Button onClick={() => openModal("qcm")}>QCM</Button>
        <Button onClick={() => openModal("open")}>Question ouverte</Button>
        <Button onClick={() => openModal("blindtest")}>Blindtest</Button>
        <Button onClick={() => openModal("ordonnees")}>Ordonnées</Button>
        <Button onClick={() => openModal("relations")}>Relations</Button>
      </div>
      {selectedModal && (
        <CreationModal modalName={selectedModal} onClose={closeModal} />
      )}
      <Questions key={questionsKey} />
    </div>
  );
};

export default Create;
