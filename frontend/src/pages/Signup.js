import React, { useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../utils/constants";
// import dotenv from "dotenv";
// dotenv.config();

const Signup = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env);
      const response = await axios.post(API_ROUTES.SIGN_UP, {
        pseudo,
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div id="signup">
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            required
            autoComplete="off"
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
