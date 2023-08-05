import React from "react";
import { NavLink } from "react-router-dom";

const Cards = ({ user }) => {
  return (
    <section className="cards-container">
      <NavLink to={user ? "/newquiz" : "/login"}>
        <div id="card">
          <p>Créer un quiz</p>
        </div>
      </NavLink>
      <NavLink to={user ? "/rooms/:id" : "/login"}>
        <div id="card">
          <p>Créer une partie</p>
        </div>
      </NavLink>
      <NavLink to="/join">
        <div id="card">
          <p>Rejoindre une partie</p>
        </div>
      </NavLink>
    </section>
  );
};

export default Cards;
