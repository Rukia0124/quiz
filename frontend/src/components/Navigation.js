import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const Navigation = ({ user, setUser }) => {
  const navigate = useNavigate();
  const disconnect = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };
  return (
    <div id="navigation">
      <NavLink to="/">
        <HomeOutlined />
      </NavLink>
      {!user ? (
        <>
          <NavLink to="/signup">Créer un compte</NavLink>
        </>
      ) : (
        <NavLink to="/profil">Profil</NavLink>
      )}
      {!user ? (
        <NavLink to="/login">Se connecter</NavLink>
      ) : (
        <span
          tabIndex={0}
          role="button"
          onKeyUp={disconnect}
          onClick={disconnect}
        >
          Se déconnecter
        </span>
      )}
    </div>
  );
};

export default Navigation;
