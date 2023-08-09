import React, { useEffect } from "react";

const SuccessMessage = ({ message }) => {
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("SUCCESS_MESSAGE", "");
    }, 1000);
  });

  return (
    <div>
      {message === "SIGNUP_SUCCESS" && "Inscription réussie !"}
      {message === "SIGNIN_SUCCESS" && "Connexion réussie !"}
    </div>
  );
};

export default SuccessMessage;
