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

  async getRoom(roomId) {
    try {
      return await Room.findOne({ id: roomId });
    } catch (error) {
      throw new Error("Failed to find room: " + error);
    }
  }

  async updateRoom(roomId, roomData) {
    try {
      const room = await Room.findOne({ roomId: roomId });
      if (!room) {
        throw new Error("Room not found");
      }

      let participants = [];
      for (let i = 0; i < roomData.participants.length; i++) {
        participants.push({
          userId: roomData.participants[i],
        });
      }

      room.participants = participants;

      return await room.save();
    } catch (error) {
      throw new Error("Failed to update room: " + error);
    }
  }
}

module.exports = new RoomService();
