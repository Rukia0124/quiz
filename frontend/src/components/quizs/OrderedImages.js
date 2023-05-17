import React, { useState } from "react";
import { createOrderedImages } from "../../lib/common";
import { CloseOutlined } from "@ant-design/icons";

const CreateOrderedImages = () => {
  const [question, setQuestion] = useState("");
  const [images, setImages] = useState([]);
  const [imageOrder, setImageOrder] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = reader.result;
      setImages((prevImages) => [...prevImages, image]);
      setImageOrder((prevOrder) => [...prevOrder, 0]);
    };
    reader.readAsDataURL(file);
  };

  const handleOrderChange = (index, value) => {
    const updatedOrder = [...imageOrder];
    updatedOrder[index] = parseInt(value);
    setImageOrder(updatedOrder);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));
  };

  const handleQuizCreation = async (e) => {
    e.preventDefault();
    const newQuiz = {
      question,
      images,
      correctAnswer: JSON.stringify(imageOrder),
    };

    try {
      console.log(newQuiz);
      await createOrderedImages(newQuiz, localStorage.getItem("token"));
      setQuestion("");
      setImages([]);
      setImageOrder([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="ordered-images">
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
        <div>
          <label>
            Ajouter une image :
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <br />
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                style={{ maxWidth: "50px" }}
              />
              <button
                type="button"
                id="delete-img"
                onClick={() => handleImageRemove(index)}
              >
                <CloseOutlined />
              </button>
              <br />
              <label>
                Ordre de l'image {index + 1}:
                <input
                  type="number"
                  value={imageOrder[index] || ""}
                  onChange={(e) => handleOrderChange(index, e.target.value)}
                />
              </label>
              <br />
            </div>
          ))}
        </div>
        <button type="submit">Créer la question</button>
      </form>
    </div>
  );
};

export default CreateOrderedImages;
