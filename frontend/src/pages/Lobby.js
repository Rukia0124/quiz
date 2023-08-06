import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { getFromCookie } from "../lib/common";
import Login from "./Login";
import Players from "../components/Players";
const socket = io(process.env.REACT_APP_API_URL);
const Lobby = ({ setUser, user }) => {
  const { id } = useParams();
  const [isRoomCreator, setIsRoomCreator] = useState(false);
  const [lobbyPlayers, setLobbyPlayers] = useState();

  useEffect(() => {
    const token = getFromCookie("token");
    const socketId = getFromCookie("socketId");

    socket.emit("checkIsRoomCreator", { roomId: id, socketId: socketId });
    socket.emit("joinRoom", { roomId: id, token: token });
    socket.on("checkIsRoomCreatorResponse", (isCreator) => {
      setIsRoomCreator(isCreator);
    });
    socket.on("listLobbyMembers", (playersPseudo) => {
      setLobbyPlayers(playersPseudo);
      console.log(playersPseudo);
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
      <Players players={lobbyPlayers} />
      {isRoomCreator && (
        <button onClick={handleCopyLink}>Copier le lien d'invitation</button>
      )}
      {user ? (
        ""
      ) : (
        <Login setUser={setUser} successRedirection={"/rooms/" + id} />
      )}
    </div>
  );
};

export default Lobby;
