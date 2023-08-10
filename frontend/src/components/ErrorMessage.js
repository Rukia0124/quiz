import React, { useEffect } from "react";

const ErrorMessage = ({ message, setErrorMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  });
  return (
    <div>
      {message === "SIGNIN_ERROR" &&
        "Paire identifiant/mot de passe incorrecte"}
    </div>
  );
};

export default ErrorMessage;
