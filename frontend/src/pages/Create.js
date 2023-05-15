import React from "react";
import { NavLink } from "react-router-dom";

const Create = () => {
  return (
    <div>
      <div>
        <NavLink to="/questions">Voir mes question</NavLink>
        <NavLink to="/qcm">
          <p>Créer un qcm</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Create;
