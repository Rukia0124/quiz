import React, { useState } from "react";
import { createOrderedImages } from "../../lib/common";

const OrderedImages = () => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [images, setImages] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleCorrectAnswerChange = (e) => {
    const answerString = e.target.value;
    const answerArray = answerString
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));

    setCorrectAnswer(answerArray);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImages((prevImages) => [...prevImages, selectedImage]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length !== 4) {
      console.error("Veuillez ajouter 4 images.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("correctAnswer", correctAnswer);
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      await createOrderedImages(formData, localStorage.getItem("token"));
      setQuestion("");
      setCorrectAnswer("");
      setImages([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="ordered-images">
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question</label>
        <input
          id="question"
          name="question"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Classez ces acteurs du plus petit au plus grand"
        />
        <div className="images">
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <input
          name="images"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <label htmlFor="correctAnswer">Réponse</label>
        <input
          id="correctAnswer"
          name="correctAnswer"
          value={correctAnswer}
          onChange={handleCorrectAnswerChange}
          placeholder="4,2,1,3"
        />

        <button type="submit">Créer la question</button>
      </form>
    </div>
  );
};

export default OrderedImages;
