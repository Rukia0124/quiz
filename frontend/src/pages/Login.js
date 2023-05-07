import React from "react";

const Login = () => {
  return (
    <div>
      <div id="login">
        <div>
          <form>
            <label>Pseudo</label>
            <input type="text" name="name" required autoComplete="off" />
            <label>Email</label>
            <input type="email" name="email" required autoComplete="off" />
            <label>Mot de passe</label>
            <textarea name="message" required />
            <input type="submit" value="Envoyer" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
