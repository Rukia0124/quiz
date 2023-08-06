import React, { useEffect } from "react";

const SuccessMessage = ({ message }) => {
  useEffect(() => {
    localStorage.setItem('SUCCESS_MESSAGE', "");
  });

  return (
    <div>
      {message == "SIGNUP_SUCCESS" && ("Inscription réussie !")}
      {message == "SIGNIN_SUCCESS" && ("Connexion réussie !")}
    </div>
  );
};

export default SuccessMessage;
