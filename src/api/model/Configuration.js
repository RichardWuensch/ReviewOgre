export default class Configuration {
  authorIsNotary;
  participants = [];
  roomSlots = [];

  constructor (authorIsNotary, participants, roomSlots) {
    this.authorIsNotary = authorIsNotary;
    this.parseParticipants(participants);
    this.parseRoomSlots(roomSlots);
  }

  parseParticipants (participants) {
    for (const p of participants) {
      const newParticipant = {
        firstName: p.getFirstName(),
        lastName: p.getLastName(),
        email: p.getEmail(),
        group: p.getGroup(),
        topic: p.getTopic(),
        languageLevel: p.getLanguageLevel()
      };
      this.participants.push(newParticipant);
    }
  }

  parseRoomSlots (roomSlots) {
    for (const roomSlot of roomSlots) {
      const newRoomSlot = {
        date: roomSlot.getDate(),
        startTime: roomSlot.getStartTime(),
        endTime: roomSlot.getEndTime(),
        rooms: []
      };
      for (const room of roomSlot.getRooms()) {
        const newRoom = {
          name: room.getName(),
          beamer: room.hasBeamer()
        };
        newRoomSlot.rooms.push(newRoom);
      }
      this.roomSlots.push(newRoomSlot);
    }
  }
}
