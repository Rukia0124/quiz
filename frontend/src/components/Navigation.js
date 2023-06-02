import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const Navigation = ({ user, setUser }) => {
  const navigate = useNavigate();

  const clearCookies = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const disconnect = () => {
    clearCookies();
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
