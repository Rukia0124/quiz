import React from "react";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div id="navigation">
      <NavLink to={"/login"}>
        <Button>Connection</Button>
      </NavLink>
      <NavLink to={"/signup"}>
        <Button>Inscription</Button>
      </NavLink>
      <NavLink to={"/signup"}>
        <Button>Profil</Button>
      </NavLink>
    </div>
  );
};

export default Navigation;
