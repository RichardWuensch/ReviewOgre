export default class Configuration {
  participants = [];
  roomSlots = [];
  settings = {};

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
          beamer: room.getBeamerNeeded()
        };
        newRoomSlot.rooms.push(newRoom);
      }
      this.roomSlots.push(newRoomSlot);
    }
  }

  parseSettings (settings) {
    this.settings.authorIsNotary = settings.authorIsNotary ? settings.authorIsNotary : false;
    this.settings.breakForModeratorAndReviewer = settings.breakForModeratorAndReviewer ? settings.breakForModeratorAndReviewer : false;
    this.settings.abReview = settings.abReview ? settings.abReview : false;
    this.settings.internationalGroups = settings.internationalGroups ? settings.internationalGroups : false;
  }
}
