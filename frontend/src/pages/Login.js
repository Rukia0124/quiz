import axios from "axios";
import React, { useState } from "react";
import { API_ROUTES } from "../utils/constants";
import { storeInCookies } from "../lib/common";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, successRedirection }) => {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(API_ROUTES.SIGN_IN, {
        pseudo,
        password,
      });
      if (!response?.data?.token) {
        console.log("Something went wrong during signing in: ", response);
      } else {
        storeInCookies(response.data.token, response.data.userId);
        setUser(response.data);
        !successRedirection ? navigate("/") : navigate(successRedirection);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("Some error occurred during signing in:", err);
      setIsLoading(false);
    }
  };

  return (
    <div id="login">
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            required
            autoComplete="off"
            onChange={(e) => setPseudo(e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Envoyer" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default Login;
