const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const roomService = require("./room.service");
const mongoose = require("mongoose"); // Import mongoose

let roomCreators = {};
let roomByUser = {};
let players = {};
let playersPseudos = {};
let questionsByRoom = {};
let io;

class SocketService {
  async initialize(server) {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("utilisateur connecté : " + socket.id);

      socket.on("createRoom", async ({ token, questions, quizName }) => {
        const roomId = uuidv4();
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;

        if (roomByUser[userId]) {
          let previousRoomFromUser = roomByUser[userId];
          delete roomCreators[previousRoomFromUser];
          delete players[previousRoomFromUser];
        }
        try {
          const createdRoom = roomService.createRoom({
            creatorId: userId,
            roomId: roomId,
            name: quizName,
            questions: questions,
          });
        } catch (error) {
          console.log("failed to create room: " + error.message);
        }

        io.emit("roomCreated", roomId);
        roomCreators[roomId] = socket.id;
        questionsByRoom[roomId] = questions;
        players[roomId] = [];
        playersPseudos[roomId] = [];
        roomByUser[userId] = roomId;

        console.log("room " + roomId + " créée par : " + roomCreators[roomId]);
      });

      socket.on("joinRoom", (params) => {
        let roomId = params.roomId;
        let token = params.token;
        if (!roomCreators[roomId]) {
          console.log("room " + roomId + " does not exist");
          return;
        // 

        let userId;
        let pseudo;
        let isLogged = false;
        if (token) {
          const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
          userId = decodedToken.userId;
          pseudo = decodedToken.pseudo;
          isLogged = true;
        }

        if (isLogged && roomByUser[userId] === roomId) {
          socket.join(roomId);
          console.log("creator " + socket.id + " joined room " + roomId);
        } else {
          if (!playersPseudos[roomId].includes(pseudo)) {
            playersPseudos[roomId].push(pseudo);
          }
          players[roomId].push(socket.id);
          socket.join(roomId);
          console.log("player " + socket.id + " joined room " + roomId);
        }
        try {
          let updatedRoom = roomService.updateRoom(roomId, {
            participants: playersPseudos[roomId], // Passing an array here
          });

          updatedRoom.then((value) => {
            console.log("Room participants updated:", value);
          });
        } catch (error) {
          console.log("Failed to update room participants:", error.message);
        }

        io.to(roomId).emit("listLobbyMembers", playersPseudos[roomId]);
      });

      socket.on("checkIsRoomCreator", ({ roomId, socketId }) => {
        const isCreator = roomCreators[roomId] === socketId;
        socket.emit("checkIsRoomCreatorResponse", isCreator);
      });

      socket.on("launchQuiz", ({ roomId, token }) => {
        if (!roomCreators[roomId]) {
          console.log("room " + roomId + " does not exist");
          return;
        }

        let userId;
        let pseudo;
        let isLogged = false;
        if (token) {
          const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
          userId = decodedToken.userId;
          pseudo = decodedToken.pseudo;
          isLogged = true;
        }

        if (isLogged && roomByUser[userId] === roomId) {
          console.log(`starting quiz of room ${roomId}`);
          io.to(roomId).emit("startingQuiz", playersPseudos[roomId]);
          setTimeout(() => {
            this.sendQuestion(roomId, 0);
          }, 5000);
        }
      });
    });
  }

  sendQuestion(roomId, index) {
    console.log(`sending question ${index} to room ${roomId}`);
    io.to(roomId).emit("newQuestion", {
      question: questionsByRoom[roomId][index].question,
      type: questionsByRoom[roomId][index].type,
    });
    setTimeout(() => {
      index++;
      if (questionsByRoom[roomId].length > index) {
        this.sendQuestion(roomId, index);
      } else {
        console.log(`ending quiz of room ${roomId}`);
        // TODO: terminate quiz
      }
    }, 10000);
  }
}

module.exports = new SocketService();
