import React from "react";
import { useParams } from "react-router-dom";

const Lobby = () => {
  const { id } = useParams();

  const handleCopyLink = () => {
    const invitationLink = `${process.env.REACT_APP_LOBBY_URL}${id}`;
    navigator.clipboard.writeText(invitationLink);
  };

  return (
    <div>
      <h1>LOBBY</h1>
      <button onClick={handleCopyLink}>Copier le lien d'invitation</button>
    </div>
  );
};

export default Lobby;
