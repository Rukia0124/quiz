const Room = require("../models/room");

class RoomService {
  async createRoom(roomData) {
    try {
      const room = new Room({
        creatorId: roomData.creatorId,
        roomId: roomData.roomId,
        name: roomData.name,
        questions: roomData.questions,
        creationDate: Date.now(),
      });
      return await room.save();
    } catch (error) {
      throw new Error("Failed to create room: " + error.message);
    }
  }
}

module.exports = new RoomService();
