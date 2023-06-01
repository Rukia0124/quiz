const { v4: uuidv4 } = require("uuid");

class SocketService {
  constructor() {
    this.rooms = {}; // Objet pour stocker l'association entre l'ID de la room et l'ID du créateur
  }

  initialize(server) {
    const io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("utilisateur connecté : " + socket.id);

      socket.on("createRoom", () => {
        const roomId = uuidv4();
        const creatorId = socket.id;

        this.rooms[roomId] = creatorId; // Stocker l'association entre l'ID de la room et l'ID du créateur

        io.emit("roomCreated", roomId);
        console.log(roomId);
      });

      socket.on("checkCreator", (roomId) => {
        const creatorId = this.rooms[roomId]; // Récupérer l'ID du créateur associé à la room

        if (creatorId === socket.id) {
          socket.emit("isCreator", true);
        } else {
          socket.emit("isCreator", false);
        }
      });
    });
  }
}

module.exports = new SocketService();
