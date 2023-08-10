import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { getFromCookie } from "../lib/common";
import Login from "./Login";
import Players from "../components/Players";
import Countdown from "../components/Countdown";

const socket = io(process.env.REACT_APP_API_URL);

const Lobby = ({ setUser, user }) => {
  const { id } = useParams();
  const [isRoomCreator, setIsRoomCreator] = useState(false);
  const [lobbyPlayers, setLobbyPlayers] = useState();
  const [token, setToken] = useState();
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    setToken(getFromCookie("token"));
    const socketId = getFromCookie("socketId");

    socket.emit("checkIsRoomCreator", { roomId: id, socketId: socketId });

    socket.emit("joinRoom", { roomId: id, token: token });

    socket.on("checkIsRoomCreatorResponse", (isCreator) => {
      setIsRoomCreator(isCreator);
    });

    socket.on("listLobbyMembers", (playersPseudo) => {
      setLobbyPlayers(playersPseudo);
    });

    socket.on("startingQuiz", () => {
      //count
    });

    return () => {
      socket.off("checkIsRoomCreatorResponse");
    };
  }, [id, token]);

  const handleCopyLink = () => {
    const invitationLink = `${process.env.REACT_APP_LOBBY_URL}${id}`;
    navigator.clipboard.writeText(invitationLink);
  };

  const launchQuiz = () => {
    if (isRoomCreator) {
      socket.emit("launchQuiz", { roomId: id, token: token });
      setQuizStarted(true);
    }
  };

  return (
    <div>
      {quizStarted ? (
        <Countdown />
      ) : (
        <div>
          <Players players={lobbyPlayers} />
          {isRoomCreator && (
            <div>
              <button onClick={handleCopyLink}>
                Copier le lien d'invitation
              </button>
              <button onClick={launchQuiz}>Commencer le Quiz</button>
            </div>
          )}
          {user ? (
            ""
          ) : (
            <Login setUser={setUser} successRedirection={"/rooms/" + id} />
          )}
        </div>
      )}
    </div>
  );
};

export default Lobby;
