const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

let roomCreators = {};
let roomByUser = {};
let players = {};
let playersPseudos = {};

class SocketService {
  initialize(server) {
    const io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("utilisateur connecté : " + socket.id);

      socket.on("createRoom", (token) => {
        const roomId = uuidv4();
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;

        if (roomByUser[userId]) {
          let previousRoomFromUser = roomByUser[userId];
          delete roomCreators[previousRoomFromUser];
          delete players[previousRoomFromUser];
        }

        io.emit("roomCreated", roomId);
        roomCreators[roomId] = socket.id;
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
        }

        let userId;
        let pseudo;
        let isLogged = false;
        if (token) {
          const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
          userId = decodedToken.userId;
          pseudo = decodedToken.pseudo;
          isLogged = true;
          console.log(token);
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

        io.to(roomId).emit("listLobbyMembers", playersPseudos[roomId]);
      });

      socket.on("checkIsRoomCreator", ({ roomId, socketId }) => {
        const isCreator = roomCreators[roomId] === socketId;
        socket.emit("checkIsRoomCreatorResponse", isCreator);
      });
    });
  }
}
module.exports = new SocketService();
