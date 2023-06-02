import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { getFromCookie } from "../lib/common";
const socket = io(process.env.REACT_APP_API_URL);

const Lobby = () => {
  const { id } = useParams();
  const [isRoomCreator, setIsRoomCreator] = useState(false);

  useEffect(() => {
    const socketId = getFromCookie("socketId");
    socket.emit("checkIsRoomCreator", { roomId: id, socketId: socketId });

    socket.on("checkIsRoomCreatorResponse", (isCreator) => {
      setIsRoomCreator(isCreator);
    });

    return () => {
      socket.off("checkIsRoomCreatorResponse");
    };
  }, [id]);

  const handleCopyLink = () => {
    const invitationLink = `${process.env.REACT_APP_LOBBY_URL}${id}`;
    navigator.clipboard.writeText(invitationLink);
  };

  return (
    <div>
      <h1>LOBBY</h1>
      {isRoomCreator && (
        <button onClick={handleCopyLink}>Copier le lien d'invitation</button>
      )}
    </div>
  );
};

export default Lobby;
