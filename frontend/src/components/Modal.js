import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import CreateQcm from "./quizs/Qcm";
import CreateOpenQuestion from "./quizs/Open";

const CreationModal = ({ modalName, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose();
  };

  let modalContent = null;

  switch (modalName) {
    case "qcm":
      modalContent = <CreateQcm />;
      break;
    case "blindtest":
      modalContent = (
        <div>
          <h3>Blindtest</h3>
          <Form>
            <Form.Item label="Titre de la chanson">
              <Input />
            </Form.Item>
            <Form.Item label="Artiste">
              <Input />
            </Form.Item>
          </Form>
        </div>
      );
      break;
    case "ordonnees":
      modalContent = (
        <div>
          <h3>Ordonnées</h3>
          <Form>
            <Form.Item label="Question">
              <Input />
            </Form.Item>
            <Form.Item label="Options">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </div>
      );
      break;
    case "open":
      modalContent = <CreateOpenQuestion />;
      break;
    case "relations":
      modalContent = (
        <div>
          <h3>Relations</h3>
          <Form>
            <Form.Item label="Entité 1">
              <Input />
            </Form.Item>
            <Form.Item label="Entité 2">
              <Input />
            </Form.Item>
            <Form.Item label="Relation">
              <Input />
            </Form.Item>
          </Form>
        </div>
      );
      break;
    default:
      modalContent = null;
  }

  return (
    <Modal
      title="Créer un quiz"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {modalContent}
    </Modal>
  );
};

export default CreationModal;
