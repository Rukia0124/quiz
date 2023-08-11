import React, { useEffect } from "react";

const SuccessMessage = ({ message, setMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("SUCCESS_MESSAGE", "");
    }, 1000);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  });

  return (
    <div>
      {message === "SIGNUP_SUCCESS" && "Inscription réussie !"}
      {message === "SIGNIN_SUCCESS" && "Connexion réussie !"}
    </div>
  );
};

export default SuccessMessage;
