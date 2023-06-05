export default class Configuration {
  authorIsNotary;
  participants = [];
  roomSlots = [];

  getAuthorIsNotary () {
    return this.authorIsNotary;
  }

  setAuthorIsNotary (authorIsNotary) {
    this.authorIsNotary = authorIsNotary;
  }

  getParticipants () {
    return this.participants;
  }

  setParticipants (participants) {
    this.participants = participants;
  }

  getRoomSlots () {
    return this.roomSlots;
  }

  setRoomSlots (roomSlots) {
    this.roomSlots = roomSlots;
  }

  parseParticipantsFromStore (participants) {
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

  parseRoomSlotsFromStore (roomSlots) {
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

  parseConfigurationFromStore (authorIsNotary) {
    this.authorIsNotary = authorIsNotary;
  }
}
