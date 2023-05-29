class SocketService {
  initialize(server) {
    const io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    io.on("connection", (socket) => {
      console.log(socket);
    });
  }
}
module.exports = new SocketService();
