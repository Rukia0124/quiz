const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

let roomCreators = {};
let roomByUser = {};

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
        }

        io.emit("roomCreated", roomId);
        roomCreators[roomId] = socket.id;
        roomByUser[userId] = roomId;

        console.log("room " + roomId + " créée par : " + roomCreators[roomId]);
      });

      socket.on("checkIsRoomCreator", ({ roomId, socketId }) => {
        const isCreator = roomCreators[roomId] === socketId;
        socket.emit("checkIsRoomCreatorResponse", isCreator);
      });
    });
  }
}

module.exports = new SocketService();
